import { Inject, Injectable } from "@nestjs/common";
import { ActionsMapper } from "@/exercises/actions/actions.mapper";
import { ActionTypesService } from "@/exercises/actionTypes/actionTypes.service";
import { ACTIVITY_ACTIONS_REPOSITORY, ROUTINE_ACTIONS_REPOSITORY } from "@/exercises/constants";
import { ActivityActionsRepository, RoutineActionsRepository } from "@/exercises/models";
import { ActivityActionViewModel } from "@/exercises/viewModels/activity.action.viewmodel";
import { RoutineActionViewModel } from "@/exercises/viewModels/routine.action.viewmodel";

@Injectable()
export class ActionsService {
	constructor(@Inject(ACTIVITY_ACTIONS_REPOSITORY) private readonly activityActionsRepository: ActivityActionsRepository, @Inject(ROUTINE_ACTIONS_REPOSITORY) private readonly routineActionsRepository: RoutineActionsRepository, private readonly mapper: ActionsMapper, private readonly actionTypesService: ActionTypesService) {}

	async updateActivityActions(viewModels: ActivityActionViewModel[], activityId: string) {
		const actions = await this.activityActionsRepository.findAll({
			where: {
				activity_id: activityId,
			},
		});
		for (const viewModel of viewModels) {
			const found = actions.find((action) => action.id === viewModel.id);
			const actionType = await this.actionTypesService.createActionType(viewModel.actionType);
			const model = this.mapper.activityActionCreateToEntity(viewModel, activityId);
			model.action_type_id = actionType.id;
			if (found) {
				// Remove from the existing comments, so we have the remaining comments at the end, which are deletes
				actions.splice(actions.indexOf(found), 1);
				await found.update(model);
			}
			// New record
			else {
				await this.activityActionsRepository.create(model);
			}
		}
		return Promise.all(actions.map((action) => action.destroy()));
	}

	async updateRoutineActions(viewModels: RoutineActionViewModel[], routineId: string) {
		const actions = await this.routineActionsRepository.findAll({
			where: {
				routine_id: routineId,
			},
		});
		for (const viewModel of viewModels) {
			const found = actions.find((action) => action.id === viewModel.id);
			const actionType = await this.actionTypesService.createActionType(viewModel.actionType);
			const model = this.mapper.routineActionCreateToEntity(viewModel, routineId);
			model.action_type_id = actionType.id;
			if (found) {
				// Remove from the existing comments, so we have the remaining comments at the end, which are deletes
				actions.splice(actions.indexOf(found), 1);
				await found.update(model);
			}
			// New record
			else {
				await this.routineActionsRepository.create(model);
			}
		}
		return Promise.all(actions.map((action) => action.destroy()));
	}
}
