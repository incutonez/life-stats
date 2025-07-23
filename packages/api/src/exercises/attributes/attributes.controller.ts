import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AttributesService } from "@/exercises/attributes/attributes.service";

@ApiTags("attributes")
@Controller("attributes")
export class AttributesController {
	constructor(private readonly service: AttributesService) {
	}
}
