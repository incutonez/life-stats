import { Module } from "@nestjs/common";
import { AttributeTypesController } from "@/attributeTypes/attributeTypes.controller";
import { AttributeTypesMapper } from "@/attributeTypes/attributeTypes.mapper";
import { AttributeTypesService } from "@/attributeTypes/attributeTypes.service";
import { AttributeTypesRepository } from "@/db/models";

@Module({
	controllers: [AttributeTypesController],
	providers: [AttributeTypesService, AttributeTypesMapper, AttributeTypesRepository],
	exports: [AttributeTypesService, AttributeTypesMapper],
})
export class AttributeTypesModule {
}
