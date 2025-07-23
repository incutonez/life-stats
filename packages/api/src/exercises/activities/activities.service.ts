import { Inject, Injectable } from "@nestjs/common";
import { ActionsService } from "@/exercises/actions/actions.service";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { AttributesService } from "@/exercises/attributes/attributes.service";
import { ACTIVITIES_REPOSITORY, ACTIVITY_TYPES_REPOSITORY } from "@/exercises/constants";
import { ActivitiesRepository, ActivityTypesRepository } from "@/exercises/models";
import { ActivityTypeCreateViewModel } from "@/exercises/viewModels/activity.type.viewmodel";
import { ActivityListViewModel, ActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";

@Injectable()
export class ActivitiesService {
	constructor(
		@Inject(ACTIVITIES_REPOSITORY) private readonly repository: ActivitiesRepository,
		@Inject(ACTIVITY_TYPES_REPOSITORY) private readonly activityTypesRepository: ActivityTypesRepository,
		private readonly mapper: ActivitiesMapper,
		private readonly attributesService: AttributesService,
		private readonly actionsService: ActionsService,
	) {
	}

	async listActivities(): Promise<ActivityListViewModel> {
		const { rows, count } = await this.repository.findAndCountAll({
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
		const [entity] = await this.activityTypesRepository.findOrCreate({
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

	async getActivityEntity(id: string) {
		return this.repository.findByPk(id, {
			include: [{
				all: true,
				nested: true,
			}],
			order: [["actions", "order", "asc"]],
		});
	}

	async getActivity(id: string) {
		const entity = await this.getActivityEntity(id);
		if (entity) {
			return this.mapper.entityToViewModel(entity);
		}
	}

	async getActivityTypes(addMeta = false) {
		const entities = await this.activityTypesRepository.findAll();
		return entities.map((entity) => this.mapper.entityActivityTypeToViewModel(entity, addMeta));
	}

	async updateActivity(viewModel: ActivityViewModel) {
		const record = await this.getActivityEntity(viewModel.id);
		if (record) {
			const { attributes: viewModelAttributes = [], activityType: viewModelActivityType, actions: viewModelActions = [] } = viewModel;
			// If the activityType has a different ID, then we need to create (or find) the activityType and reassign it in the viewModel
			if (viewModelActivityType && viewModelActivityType.id !== record.activity_type_id) {
				viewModel.activityType = await this.createActivityType(viewModelActivityType);
			}
			await this.attributesService.updateActivityAttributes(viewModelAttributes, record.id);
			// Any remaining records in the DB model were removed in the UI
			await this.actionsService.updateActivityActions(viewModelActions, record.id);
			await record.update(this.mapper.viewModelToEntity(viewModel));
			return this.getActivity(viewModel.id);
		}
	}

	async deleteActivity(id: string) {
		const activity = await this.getActivityEntity(id);
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
		const { id } = await this.repository.create(this.mapper.viewModelToEntity(viewModel));
		if (viewModel.attributes) {
			await this.attributesService.updateActivityAttributes(viewModel.attributes, id);
		}
		if (viewModel.actions) {
			await this.actionsService.updateActivityActions(viewModel.actions, id);
		}
		return id;
	}
}
