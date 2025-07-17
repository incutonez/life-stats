import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActionsMapper } from "@/exercises/actions/actions.mapper";
import { ActionTypesMapper } from "@/exercises/actionTypes/actionTypes.mapper";
import { IRoutineModel, RoutineModel } from "@/exercises/models/RoutineModel";
import { RoutineViewModel } from "@/exercises/viewModels/routine.viewmodel";
import { addMetaInfo } from "@/utils";

@Injectable()
export class RoutinesMapper {
	constructor(@Inject(SESSION_STORAGE) private readonly storage: SessionStorageService, private readonly actionsMapper: ActionsMapper, private readonly actionTypesMapper: ActionTypesMapper) {
	}

	entityToViewModel({ id, name, actions = [], user_id, updated_at, created_at }: RoutineModel, addMeta = false): RoutineViewModel {
		const viewModel = {
			id,
			name,
			actions: actions.map((action) => this.actionsMapper.routineActionToViewModel(action)),
		};
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	viewModelToEntity({ id, name, actions, userId = this.storage.getUserId() }: RoutineViewModel): IRoutineModel {
		return {
			id,
			name,
			user_id: userId,
			actions: actions.map((action) => this.actionsMapper.routineActionToEntity(action)),
		};
	}
}
