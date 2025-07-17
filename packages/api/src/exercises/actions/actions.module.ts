import { Module } from "@nestjs/common";
import { ActionsController } from "@/exercises/actions/actions.controller";
import { ActionsMapper } from "@/exercises/actions/actions.mapper";
import { ActionsService } from "@/exercises/actions/actions.service";
import { ActionTypesModule } from "@/exercises/actionTypes/actionTypes.module";

@Module({
	imports: [ActionTypesModule],
	controllers: [ActionsController],
	providers: [ActionsService, ActionsMapper],
	exports: [ActionsService, ActionsMapper],
})
export class ActionsModule {}
