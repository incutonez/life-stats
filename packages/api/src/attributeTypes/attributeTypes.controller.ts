import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AttributeTypesService } from "@/attributeTypes/attributeTypes.service";
import { AttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

@ApiTags("attributeTypes")
@Controller("attribute-types")
export class AttributeTypesController {
	constructor(private readonly service: AttributeTypesService) {
	}

	@Get("")
	async getAttributeTypes(): Promise<AttributeTypeViewModel[]> {
		return this.service.getAttributeTypes();
	}
}
