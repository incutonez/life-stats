import { Module } from "@nestjs/common";
import { AttributeTypesController } from "@/attributeTypes/attributeTypes.controller";
import { AttributeTypesMapper } from "@/attributeTypes/attributeTypes.mapper";
import { AttributeTypesService } from "@/attributeTypes/attributeTypes.service";

@Module({
	controllers: [AttributeTypesController],
	providers: [AttributeTypesService, AttributeTypesMapper],
	exports: [AttributeTypesService, AttributeTypesMapper],
})
export class AttributeTypesModule {
}
