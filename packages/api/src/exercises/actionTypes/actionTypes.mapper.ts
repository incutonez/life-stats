import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActionTypeModel, IActionTypeModel } from "@/exercises/models/ActionTypeModel";
import { ActivityActionModel } from "@/exercises/models/ActivityActionModel";
import { RoutineActionModel } from "@/exercises/models/RoutineActionModel";
import { ActionTypeViewModel,	IActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";
import { IActivityActionViewModel } from "@/exercises/viewModels/activity.action.viewmodel";
import { IRoutineActionViewModel } from "@/exercises/viewModels/routine.action.viewmodel";
import { addMetaInfo } from "@/utils";

@Injectable()
export class ActionTypesMapper {
	constructor(@Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	activityActionToViewModel({ id, user_id, updated_at, created_at, action_type, value, order }: ActivityActionModel, addMeta = false): IActivityActionViewModel {
		const viewModel = {
			id,
			value,
			order,
			actionType: this.entityToViewModel(action_type),
		};
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	routineActionToViewModel({ id, user_id, updated_at, created_at, action_type, value, order }: RoutineActionModel, addMeta = false): IRoutineActionViewModel {
		const viewModel = {
			id,
			value,
			order,
			actionType: this.entityToViewModel(action_type),
		};
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	entityToViewModel({ id, name, user_id, created_at, updated_at, activities, routines }: ActionTypeModel, addMeta = false): IActionTypeViewModel {
		const viewModel = {
			id,
			name,
			actions: activities?.map((action) => this.activityActionToViewModel(action)),
			routines: routines?.map((routine) => this.routineActionToViewModel(routine)),
		};
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	viewModelToEntity({ id, userId = this.storage.getUserId(), name }: ActionTypeViewModel): IActionTypeModel {
		return {
			id,
			name,
			user_id: userId,
		};
	}
}
