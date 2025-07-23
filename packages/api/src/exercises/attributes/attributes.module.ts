import { Module } from "@nestjs/common";
import { AttributeTypesModule } from "@/attributeTypes/attributeTypes.module";
import { AttributesController } from "@/exercises/attributes/attributes.controller";
import { AttributesMapper } from "@/exercises/attributes/attributes.mapper";
import { AttributesService } from "@/exercises/attributes/attributes.service";
import { ActivityAttributesRepository } from "@/exercises/models";

@Module({
	imports: [AttributeTypesModule],
	controllers: [AttributesController],
	providers: [AttributesService, AttributesMapper, ActivityAttributesRepository],
	exports: [AttributesService, AttributesMapper],
})
export class AttributesModule {
}
