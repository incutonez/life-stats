import { Injectable } from "@nestjs/common";
import { AttributeTypesService } from "@/attributeTypes/attributeTypes.service";
import { ActionsService } from "@/exercises/actions/actions.service";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { ActivityAttributeModel } from "@/exercises/models/ActivityAttributeModel";
import { ActivityModel } from "@/exercises/models/ActivityModel";
import { ActivityTypeModel } from "@/exercises/models/ActivityTypeModel";
import { ActivityAttributeViewModel } from "@/exercises/viewModels/activity.attribute.viewmodel";
import { ActivityTypeCreateViewModel } from "@/exercises/viewModels/activity.type.viewmodel";
import { ActivityListViewModel, ActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";

@Injectable()
export class ActivitiesService {
	constructor(private mapper: ActivitiesMapper, private readonly attributeTypesService: AttributeTypesService, private readonly actionsService: ActionsService) {
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
			}, {
				association: "actions",
				include: [{
					association: "action_type",
				}],
			}],
		});
		return {
			total: count,
			data: rows.map((row) => this.mapper.entityToViewModel(row)),
		};
	}

	async createActivityType(viewModel: ActivityTypeCreateViewModel) {
		const { name, user_id } = this.mapper.viewModelCreateActivityTypeToEntity(viewModel);
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

	async updateActivityAttributes(viewModels: ActivityAttributeViewModel[], activityId: string) {
		const entities = await ActivityAttributeModel.findAll({
			where: {
				activity_id: activityId,
			},
		});
		for (const viewModel of viewModels) {
			const { id } = viewModel;
			const found = entities.find((attribute) => attribute.id === id);
			if (found) {
				// Remove from the existing comments, so we have the remaining comments at the end, which are deletes
				entities.splice(entities.indexOf(found), 1);
				// Only apply an update if we deem the attribute has changed
				if (!(found.value === viewModel.value && found.unit === viewModel.unit && found.unit_display === viewModel.unitDisplay)) {
					await found.update(this.mapper.activityAttributeToEntity(viewModel));
				}
			}
			// New record
			else {
				const attributeType = await this.attributeTypesService.createAttributeType(viewModel.attributeType);
				const model = this.mapper.activityAttributeToEntity(viewModel);
				model.attribute_type_id = attributeType.id;
				model.activity_id = activityId;
				await ActivityAttributeModel.create(model);
			}
		}
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

	async updateActivity(viewModel: ActivityViewModel) {
		const record = await this.getActivityRaw(viewModel.id);
		if (record) {
			const { attributes = [] } = record;
			const { attributes: viewModelAttributes = [], activityType: viewModelActivityType, actions: viewModelActions = [] } = viewModel;
			// If the activityType has a different ID, then we need to create (or find) the activityType and reassign it in the viewModel
			if (viewModelActivityType && viewModelActivityType.id !== record.activity_type_id) {
				viewModel.activityType = await this.createActivityType(viewModelActivityType);
			}
			await this.updateActivityAttributes(viewModelAttributes, record.id);
			// Any remaining records in the DB model were removed in the UI
			await this.actionsService.updateActivityActions(viewModelActions, record.id);
			// Any remaining records in the DB model were removed in the UI
			await Promise.all(attributes.map((attribute) => attribute.destroy()));
			await record.update(this.mapper.viewModelToEntity(viewModel));
			return this.getActivity(viewModel.id);
		}
	}

	async deleteActivity(id: string) {
		const activity = await this.getActivityRaw(id);
		if (activity) {
			return activity.destroy();
		}
	}

	async createActivityWithResponse(viewModel: ActivityViewModel) {
		const activityId = await this.createActivity(viewModel);
		return this.getActivity(activityId);
	}

	async createActivity(viewModel: ActivityViewModel) {
		viewModel.activityType = await this.createActivityType(viewModel.activityType);
		const { id } = await ActivityModel.create(this.mapper.viewModelToEntity(viewModel));
		if (viewModel.attributes) {
			await this.updateActivityAttributes(viewModel.attributes, id);
		}
		if (viewModel.actions) {
			await this.actionsService.updateActivityActions(viewModel.actions, id);
		}
		return id;
	}
}
