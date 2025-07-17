import { Injectable } from "@nestjs/common";
import { ActionsMapper } from "@/exercises/actions/actions.mapper";
import { ActionTypesService } from "@/exercises/actionTypes/actionTypes.service";
import { ActivityActionModel } from "@/exercises/models/ActivityActionModel";
import { RoutineActionModel } from "@/exercises/models/RoutineActionModel";
import { ActivityActionViewModel } from "@/exercises/viewModels/activity.action.viewmodel";
import { RoutineActionViewModel } from "@/exercises/viewModels/routine.action.viewmodel";

@Injectable()
export class ActionsService {
	constructor(private mapper: ActionsMapper, private readonly actionTypesService: ActionTypesService) {}

	async updateActivityActions(viewModels: ActivityActionViewModel[], activityId: string) {
		const actions = await ActivityActionModel.findAll({
			where: {
				activity_id: activityId,
			},
		});
		for (const viewModel of viewModels) {
			const found = actions.find((action) => action.id === viewModel.id);
			if (found) {
				// Remove from the existing comments, so we have the remaining comments at the end, which are deletes
				actions.splice(actions.indexOf(found), 1);
				if (found && !(found.value === viewModel.value && found.order === viewModel.order && found.action_type_id === viewModel.actionType.id)) {
					const actionType = await this.actionTypesService.createActionType(viewModel.actionType);
					const model = this.mapper.activityActionToEntity(viewModel, activityId);
					model.action_type_id = actionType.id;
					return found.update(model);
				}
			}
			// New record
			else {
				const actionType = await this.actionTypesService.createActionType(viewModel.actionType);
				const model = this.mapper.activityActionToEntity(viewModel, activityId);
				model.action_type_id = actionType.id;
				// TODOJEF: Do we have to delete the ID here?
				return ActivityActionModel.create(model);
			}
		}
		return Promise.all(actions.map((action) => action.destroy()));
	}

	async updateRoutineActions(viewModels: RoutineActionViewModel[], routineId: string) {
		const actions = await RoutineActionModel.findAll({
			where: {
				routine_id: routineId,
			},
		});
		for (const viewModel of viewModels) {
			const found = actions.find((action) => action.id === viewModel.id);
			if (found) {
				// Remove from the existing comments, so we have the remaining comments at the end, which are deletes
				actions.splice(actions.indexOf(found), 1);
				if (found && !(found.value === viewModel.value && found.order === viewModel.order && found.action_type_id === viewModel.actionType.id)) {
					const actionType = await this.actionTypesService.createActionType(viewModel.actionType);
					const model = this.mapper.routineActionToEntity(viewModel, routineId);
					model.action_type_id = actionType.id;
					return found.update(model);
				}
			}
			// New record
			else {
				const actionType = await this.actionTypesService.createActionType(viewModel.actionType);
				const model = this.mapper.routineActionToEntity(viewModel, routineId);
				model.action_type_id = actionType.id;
				// TODOJEF: Do we have to delete the ID here?
				return RoutineActionModel.create(model);
			}
		}
		return Promise.all(actions.map((action) => action.destroy()));
	}
}
