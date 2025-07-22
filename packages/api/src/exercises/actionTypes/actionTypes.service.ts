import { Injectable } from "@nestjs/common";
import { ActionTypesMapper } from "@/exercises/actionTypes/actionTypes.mapper";
import { ActionTypeModel } from "@/exercises/models/ActionTypeModel";
import { ActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";

@Injectable()
export class ActionTypesService {
	constructor(private mapper: ActionTypesMapper) {
	}

	async getActionTypes(addMeta = false) {
		const entities = await ActionTypeModel.findAll();
		return entities.map((entity) => this.mapper.actionTypeToViewModel(entity, addMeta));
	}

	async createActionType(actionType: ActionTypeViewModel) {
		const { name, user_id } = this.mapper.actionTypeToEntity(actionType);
		const [entity] = await ActionTypeModel.findOrCreate({
			where: {
				name,
			},
			defaults: {
				name,
				user_id,
			},
		});
		return entity;
	}
}
