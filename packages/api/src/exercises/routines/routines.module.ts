import { Module } from "@nestjs/common";
import { ActionsModule } from "@/exercises/actions/actions.module";
import { ActionTypesModule } from "@/exercises/actionTypes/actionTypes.module";
import { RoutinesRepository } from "@/exercises/models";
import { RoutinesController } from "@/exercises/routines/routines.controller";
import { RoutinesMapper } from "@/exercises/routines/routines.mapper";
import { RoutinesService } from "@/exercises/routines/routines.service";

@Module({
	imports: [ActionsModule, ActionTypesModule],
	controllers: [RoutinesController],
	providers: [RoutinesService, RoutinesMapper, RoutinesRepository],
})
export class RoutinesModule {}
