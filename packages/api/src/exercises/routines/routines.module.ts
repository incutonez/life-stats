import { Module } from "@nestjs/common";
import { ActionTypesModule } from "@/exercises/actionTypes/actionTypes.module";
import { RoutinesController } from "@/exercises/routines/routines.controller";
import { RoutinesMapper } from "@/exercises/routines/routines.mapper";
import { RoutinesService } from "@/exercises/routines/routines.service";

@Module({
	imports: [ActionTypesModule],
	controllers: [RoutinesController],
	providers: [RoutinesService, RoutinesMapper],
})
export class RoutinesModule {}
