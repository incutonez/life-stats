import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ActionTypesService } from "@/exercises/actionTypes/actionTypes.service";
import { ActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";

@ApiTags("actionTypes")
@Controller("action-types")
export class ActionTypesController {
	constructor(private readonly service: ActionTypesService) {
	}

	@Get("")
	async getActionTypes(): Promise<ActionTypeViewModel[]> {
		return this.service.getActionTypes();
	}
}
