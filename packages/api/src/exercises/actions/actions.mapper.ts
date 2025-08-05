import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActionTypesMapper } from "@/exercises/actionTypes/actionTypes.mapper";
import { ActivityActionModel, IActivityActionCreate } from "@/exercises/models/ActivityActionModel";
import { IRoutineActionCreate, RoutineActionModel } from "@/exercises/models/RoutineActionModel";
import { ActionViewModel, IActionNestedViewModel, IActionViewModel } from "@/exercises/viewModels/action.viewmodel";
import { addMetaInfo } from "@/utils";

@Injectable()
export class ActionsMapper {
	constructor(private readonly actionTypesMapper: ActionTypesMapper, @Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	actionToViewModel({ id, user_id, updated_at, created_at, action_type, value, order }: RoutineActionModel | ActivityActionModel, addMeta = false): IActionViewModel {
		const viewModel = {
			id,
			value,
			order,
			actionType: this.actionTypesMapper.actionTypeToViewModel(action_type),
		};
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	actionNestedToViewModel({ id, user_id, updated_at, created_at, value, order }: RoutineActionModel | ActivityActionModel, addMeta = false): IActionNestedViewModel {
		const viewModel = {
			id,
			value,
			order,
		};
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	routineActionCreateToEntity({ value, order, actionType, userId }: ActionViewModel, routineId = ""): IRoutineActionCreate {
		return {
			value,
			order,
			action_type_id: actionType.id ?? "",
			user_id: userId ?? this.storage.getUserId(),
			action_type: this.actionTypesMapper.actionTypeToEntity(actionType),
			routine_id: routineId,
		};
	}

	activityActionCreateToEntity({ value, order, actionType, userId }: ActionViewModel, activityId = ""): IActivityActionCreate {
		return {
			value,
			order,
			action_type_id: actionType.id ?? "",
			user_id: userId ?? this.storage.getUserId(),
			action_type: this.actionTypesMapper.actionTypeToEntity(actionType),
			activity_id: activityId,
		};
	}
}
