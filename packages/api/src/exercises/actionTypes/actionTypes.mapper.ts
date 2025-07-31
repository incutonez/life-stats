import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActionsMapper } from "@/exercises/actions/actions.mapper";
import { ActionTypeModel, IActionTypeModel } from "@/exercises/models/ActionTypeModel";
import { ActionTypeViewModel,	IActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";
import { addMetaInfo } from "@/utils";

@Injectable()
export class ActionTypesMapper implements OnModuleInit {
	private actionsMapper: ActionsMapper;

	constructor(private readonly moduleRef: ModuleRef, @Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	onModuleInit() {
		this.actionsMapper = this.moduleRef.get(ActionsMapper, {
			strict: false,
		});
	}

	actionTypeToViewModel({ id, name, user_id, created_at, updated_at, activities = [], routines = [] }: ActionTypeModel, addMeta = false) {
		const viewModel: IActionTypeViewModel = {
			id,
			name,
			activities: activities.length ? activities.map((action) => this.actionsMapper.actionNestedToViewModel(action)) : undefined,
			routines: routines.length ? routines.map((routine) => this.actionsMapper.actionNestedToViewModel(routine)) : undefined,
		};
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	actionTypeToEntity({ id = "", userId = this.storage.getUserId(), name }: ActionTypeViewModel): IActionTypeModel {
		return {
			id,
			name,
			user_id: userId,
		};
	}
}
