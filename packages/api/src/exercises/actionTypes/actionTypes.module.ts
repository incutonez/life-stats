import { forwardRef, Module } from "@nestjs/common";
import { ActionsModule } from "@/exercises/actions/actions.module";
import { ActionTypesController } from "@/exercises/actionTypes/actionTypes.controller";
import { ActionTypesMapper } from "@/exercises/actionTypes/actionTypes.mapper";
import { ActionTypesService } from "@/exercises/actionTypes/actionTypes.service";
import { ActionTypesRepository } from "@/exercises/models";

@Module({
	imports: [forwardRef(() => ActionsModule)],
	controllers: [ActionTypesController],
	providers: [ActionTypesService, ActionTypesMapper, ActionTypesRepository],
	exports: [ActionTypesMapper, ActionTypesService],
})
export class ActionTypesModule {
}
