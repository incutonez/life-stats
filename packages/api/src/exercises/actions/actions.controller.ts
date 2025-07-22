import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ActionsService } from "@/exercises/actions/actions.service";

@ApiTags("actions")
@Controller("actions")
export class ActionsController {
	constructor(private readonly service: ActionsService) {
	}
}
