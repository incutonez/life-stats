import { Inject, Injectable } from "@nestjs/common";
import { ActionTypesMapper } from "@/exercises/actionTypes/actionTypes.mapper";
import { ROUTINE_ACTION_TYPES_REPOSITORY } from "@/exercises/constants";
import { ActionTypesRepository } from "@/exercises/models";
import { ActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";

@Injectable()
export class ActionTypesService {
	constructor(
		@Inject(ROUTINE_ACTION_TYPES_REPOSITORY) private readonly repository: ActionTypesRepository,
		private readonly mapper: ActionTypesMapper,
	) {	}

	async getActionTypes(addMeta = false) {
		const entities = await this.repository.findAll({
			order: [["name", "asc"]],
		});
		return entities.map((entity) => this.mapper.actionTypeToViewModel(entity, addMeta));
	}

	async createActionType(actionType: ActionTypeViewModel) {
		const { name, user_id } = this.mapper.actionTypeToEntity(actionType);
		const [entity] = await this.repository.findOrCreate({
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
