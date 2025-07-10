import { Injectable } from "@nestjs/common";
import { AttributeTypesService } from "@/attributeTypes/attributeTypes.service";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { ActivityActionModel, IActivityActionModelCreate } from "@/exercises/models/ActivityActionModel";
import { ActivityActionTypeModel } from "@/exercises/models/ActivityActionTypeModel";
import {
	ActivityAttributeModel,
	IActivityAttributeCreate,
} from "@/exercises/models/ActivityAttributeModel";
import {
	ActivityModel,
	IActivityCreate,
} from "@/exercises/models/ActivityModel";
import {
	ActivityTypeModel,
	IActivityTypeCreate,
} from "@/exercises/models/ActivityTypeModel";
import {
	ActivityCreateViewModel,
	ActivityListViewModel,
	IActivityViewModel,
} from "@/exercises/viewModels/activity.viewmodel";

@Injectable()
export class ActivitiesService {
	constructor(private mapper: ActivitiesMapper, private readonly attributeTypesService: AttributeTypesService) {
	}

	async listActivities(): Promise<ActivityListViewModel> {
		const { rows, count } = await ActivityModel.findAndCountAll({
			include: [{
				association: "attributes",
				include: [{
					association: "attribute_type",
				}],
			}, {
				association: "activity_type",
			}],
		});
		return {
			total: count,
			data: rows.map((row) => this.mapper.entityToViewModel(row)),
		};
	}

	async createActivityType({ name, user_id }: IActivityTypeCreate) {
		const [entity] = await ActivityTypeModel.findOrCreate({
			where: {
				name,
			},
			defaults: {
				name,
				user_id,
			},
		});
		return this.mapper.entityActivityTypeToViewModel(entity);
	}

	async createActivityAttribute(model: IActivityAttributeCreate, activityId: string) {
		const attributeType = await this.attributeTypesService.createAttributeTypeRaw(model.attribute_type);
		model.attribute_type_id = attributeType.id;
		model.activity_id = activityId;
		return ActivityAttributeModel.create(model);
	}

	async createActionType(name: string) {
		const [entity] = await ActivityActionTypeModel.findOrCreate({
			where: {
				name,
			},
			defaults: {
				name,
			},
		});
		return entity;
	}

	async createActivityAction(model: IActivityActionModelCreate) {
		const actionType = await this.createActionType(model.action_type.name);
		model.action_type_id = actionType.id;
		return ActivityActionModel.create(model);
	}

	async createActivityEntity(model: IActivityCreate) {
		return ActivityModel.create(model);
	}

	async getActivityRaw(id: string) {
		return ActivityModel.findByPk(id, {
			include: [{
				all: true,
				nested: true,
			}],
		});
	}

	async getActivity(id: string) {
		const entity = await this.getActivityRaw(id);
		if (entity) {
			return this.mapper.entityToViewModel(entity);
		}
	}

	async getActivityTypes(addMeta = false) {
		const entities = await ActivityTypeModel.findAll();
		return entities.map((entity) => this.mapper.entityActivityTypeToViewModel(entity, addMeta));
	}

	async getActionTypes(addMeta = false) {
		const entities = await ActivityActionTypeModel.findAll();
		return entities.map((entity) => this.mapper.entityActivityActionTypeToViewModel(entity, addMeta));
	}

	async updateActivity(viewModel: IActivityViewModel) {
		const record = await this.getActivityRaw(viewModel.id);
		if (record) {
			const { attributes = [], actions = [] } = record;
			const { attributes: viewModelAttributes = [], activityType: viewModelActivityType, actions: viewModelActions = [] } = viewModel;
			// If the activityType has a different ID, then we need to create (or find) the activityType and reassign it in the viewModel
			if (viewModelActivityType && viewModelActivityType.id !== record.activity_type_id) {
				viewModel.activityType = await this.createActivityType(this.mapper.viewModelCreateActivityTypeToEntity(viewModelActivityType));
			}
			for (const viewModelAttribute of viewModelAttributes) {
				const { id, ...modelAttribute } = this.mapper.viewModelActivityAttributeToEntity(viewModelAttribute);
				const found = attributes.find((attribute) => attribute.id === id);
				if (found) {
					// Remove from the existing comments, so we have the remaining comments at the end, which are deletes
					attributes.splice(attributes.indexOf(found), 1);
					// Only apply an update if we deem the attribute has changed
					if (!(found.value === modelAttribute.value && found.unit === modelAttribute.unit && found.unit_display === modelAttribute.unit_display)) {
						await found.update(modelAttribute);
					}
				}
				// New record
				else {
					await this.createActivityAttribute(modelAttribute, record.id);
				}
			}
			for (const viewModelAction of viewModelActions) {
				const { id, ...modelAction } = this.mapper.viewModelActivityActionToEntity(viewModelAction, record.id);
				const found = actions.find((action) => action.id === id);
				if (found) {
					// Remove from the existing comments, so we have the remaining comments at the end, which are deletes
					actions.splice(actions.indexOf(found), 1);
					// Only apply an update if we deem the record has changed
					if (!(found.value === modelAction.value && found.order === modelAction.order && found.action_type_id === modelAction.action_type_id)) {
						await found.update(modelAction);
					}
				}
				// New record
				else {
					await this.createActivityAction(modelAction);
				}
			}
			// Any remaining records in the DB model were removed in the UI
			await Promise.all(actions.map((action) => action.destroy()));
			// Any remaining records in the DB model were removed in the UI
			await Promise.all(attributes.map((attribute) => attribute.destroy()));
			await record.update(this.mapper.viewModelToEntity(viewModel));
			return this.getActivity(viewModel.id);
		}
	}

	async deleteActivity(id: string) {
		return ActivityModel.destroy({
			where: {
				id,
			},
			individualHooks: true,
		});
	}

	async createActivityWithResponse(viewModel: ActivityCreateViewModel) {
		const activityId = await this.createActivity(viewModel);
		return this.getActivity(activityId);
	}

	async createActivity(viewModel: ActivityCreateViewModel) {
		const model = this.mapper.viewModelCreateToEntity(viewModel);
		const activityType = await this.createActivityType(model.activity_type);
		model.activity_type_id = activityType.id;
		const { id } = await this.createActivityEntity(model);
		for (const attribute of model.attributes) {
			await this.createActivityAttribute(attribute, id);
		}
		for (const action of model.actions) {
			action.activity_id = id;
			await this.createActivityAction(action);
		}
		return id;
	}
}
