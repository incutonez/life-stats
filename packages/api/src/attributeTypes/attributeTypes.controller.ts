import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode, HttpStatus,
	NotFoundException,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import { RuntimeException } from "@nestjs/core/errors/exceptions";
import { ApiTags } from "@nestjs/swagger";
import { AttributeTypesService } from "@/attributeTypes/attributeTypes.service";
import { ListAttributeTypesParams } from "@/attributeTypes/types";
import { EnumFeatures, UseValidationPipe } from "@/constants";
import { AttributeTypeListViewModel, AttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

@ApiTags("attributeTypes")
@Controller("attribute-types")
export class AttributeTypesController {
	constructor(private readonly service: AttributeTypesService) {
	}

	@Get("")
	async getAttributeTypes(@Query("feature", new ParseIntPipe()) feature: EnumFeatures): Promise<AttributeTypeViewModel[]> {
		return this.service.getAttributeTypes(feature);
	}

	@Post("list")
	@HttpCode(HttpStatus.OK)
	@UseValidationPipe()
	async listAttributeTypes(@Body() body: ListAttributeTypesParams): Promise<AttributeTypeListViewModel[]> {
		return this.service.listAttributeTypes(body);
	}

	@Get(":attributeTypeId")
	async getAttributeType(@Param("attributeTypeId") attributeTypeId: string): Promise<AttributeTypeViewModel> {
		const response = await this.service.getAttributeType(attributeTypeId);
		if (response) {
			return response;
		}
		throw new NotFoundException("Attribute Type not found");
	}

	@Put(":attributeTypeId")
	@UseValidationPipe()
	async updateAttributeType(@Param("attributeTypeId") attributeTypeId: string, @Body() viewModel: AttributeTypeViewModel): Promise<AttributeTypeViewModel> {
		const response = await this.service.updateAttributeType(attributeTypeId, viewModel);
		if (response) {
			return response;
		}
		throw new RuntimeException("Failed to update Attribute Type");
	}

	@Delete(":attributeTypeId")
	async deleteAttributeType(@Param("attributeTypeId") attributeTypeId: string): Promise<void> {
		await this.service.deleteAttributeType(attributeTypeId);
	}
}
