import { Module } from "@nestjs/common";
import { ActionsController } from "@/exercises/actions/actions.controller";
import { ActionsMapper } from "@/exercises/actions/actions.mapper";
import { ActionsService } from "@/exercises/actions/actions.service";
import { ActionTypesModule } from "@/exercises/actionTypes/actionTypes.module";
import { ActivityActionsRepository } from "@/exercises/models";

@Module({
	imports: [ActionTypesModule],
	controllers: [ActionsController],
	providers: [ActionsService, ActionsMapper, ActivityActionsRepository],
	exports: [ActionsService, ActionsMapper],
})
export class ActionsModule {}
