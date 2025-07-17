import { Module } from "@nestjs/common";
import { ActionTypesController } from "@/exercises/actionTypes/actionTypes.controller";
import { ActionTypesMapper } from "@/exercises/actionTypes/actionTypes.mapper";
import { ActionTypesService } from "@/exercises/actionTypes/actionTypes.service";

@Module({
	controllers: [ActionTypesController],
	providers: [ActionTypesService, ActionTypesMapper],
	exports: [ActionTypesMapper, ActionTypesService],
})
export class ActionTypesModule {
}
