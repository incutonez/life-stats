import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActionTypesMapper } from "@/exercises/actionTypes/actionTypes.mapper";
import { IActivityAction } from "@/exercises/models/ActivityActionModel";
import { IRoutineActionModel, RoutineActionModel } from "@/exercises/models/RoutineActionModel";
import { ActionViewModel } from "@/exercises/viewModels/action.viewmodel";
import { IRoutineActionViewModel } from "@/exercises/viewModels/routine.action.viewmodel";
import { addMetaInfo } from "@/utils";

@Injectable()
export class ActionsMapper {
	constructor(private readonly actionTypesMapper: ActionTypesMapper, @Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	routineActionToViewModel({ id, user_id, updated_at, created_at, action_type, value, order }: RoutineActionModel, addMeta = false): IRoutineActionViewModel {
		const viewModel = {
			id,
			value,
			order,
			actionType: this.actionTypesMapper.entityToViewModel(action_type),
		};
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	activityActionToEntity({ id, userId, actionType, value, order }: ActionViewModel, activityId = ""): IActivityAction {
		return {
			id,
			value,
			order,
			action_type_id: actionType.id,
			user_id: userId ?? this.storage.getUserId(),
			activity_id: activityId,
			action_type: this.actionTypesMapper.viewModelToEntity(actionType),
		};
	}

	routineActionToEntity({ id, userId, actionType, value, order }: ActionViewModel, routineId = ""): IRoutineActionModel {
		return {
			id,
			value,
			order,
			action_type_id: actionType.id,
			user_id: userId ?? this.storage.getUserId(),
			routine_id: routineId,
			action_type: this.actionTypesMapper.viewModelToEntity(actionType),
		};
	}
}
