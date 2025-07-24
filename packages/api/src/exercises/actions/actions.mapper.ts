import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActionTypesMapper } from "@/exercises/actionTypes/actionTypes.mapper";
import { ActionModel, IActionCreateModel } from "@/exercises/models/ActionModel";
import { IActivityActionCreate } from "@/exercises/models/ActivityActionModel";
import { IRoutineActionCreate } from "@/exercises/models/RoutineActionModel";
import { ActionViewModel, IActionNestedViewModel, IActionViewModel } from "@/exercises/viewModels/action.viewmodel";
import { addMetaInfo } from "@/utils";

@Injectable()
export class ActionsMapper {
	constructor(private readonly actionTypesMapper: ActionTypesMapper, @Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	actionToViewModel({ id, user_id, updated_at, created_at, action_type, value, order }: ActionModel, addMeta = false): IActionViewModel {
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

	actionNestedToViewModel({ id, user_id, updated_at, created_at, value, order }: ActionModel, addMeta = false): IActionNestedViewModel {
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

	actionCreateToEntity({ userId, actionType, value, order }: ActionViewModel): IActionCreateModel {
		return {
			value,
			order,
			action_type_id: actionType.id ?? "",
			user_id: userId ?? this.storage.getUserId(),
			action_type: this.actionTypesMapper.actionTypeToEntity(actionType),
		};
	}

	routineActionCreateToEntity(viewModel: ActionViewModel, routineId = ""): IRoutineActionCreate {
		return {
			...this.actionCreateToEntity(viewModel),
			routine_id: routineId,
		};
	}

	activityActionCreateToEntity(viewModel: ActionViewModel, activityId = ""): IActivityActionCreate {
		return {
			...this.actionCreateToEntity(viewModel),
			activity_id: activityId,
		};
	}
}
