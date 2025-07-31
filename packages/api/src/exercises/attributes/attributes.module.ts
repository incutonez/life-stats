import { forwardRef, Module } from "@nestjs/common";
import { AttributeTypesModule } from "@/attributeTypes/attributeTypes.module";
import { ActivitiesModule } from "@/exercises/activities/activities.module";
import { AttributesController } from "@/exercises/attributes/attributes.controller";
import { AttributesMapper } from "@/exercises/attributes/attributes.mapper";
import { AttributesService } from "@/exercises/attributes/attributes.service";
import { ActivityAttributesRepository } from "@/exercises/models";

@Module({
	imports: [forwardRef(() => AttributeTypesModule), forwardRef(() => ActivitiesModule)],
	controllers: [AttributesController],
	providers: [AttributesService, AttributesMapper, ActivityAttributesRepository],
	exports: [AttributesService, AttributesMapper],
})
export class AttributesModule {
}
