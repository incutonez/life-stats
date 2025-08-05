import { Controller, Delete, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AttributesService } from "@/exercises/attributes/attributes.service";

@ApiTags("attributes")
@Controller("attributes")
export class AttributesController {
	constructor(private readonly service: AttributesService) {
	}

	@Delete(":attributeId")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteAttribute(@Param("attributeId") attributeId: string): Promise<void> {
		await this.service.deleteAttribute(attributeId);
	}
}
