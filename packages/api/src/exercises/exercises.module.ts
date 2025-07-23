import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AuditsModule } from "@/audits/audits.module";
import { ActionsModule } from "@/exercises/actions/actions.module";
import { ActionTypesModule } from "@/exercises/actionTypes/actionTypes.module";
import { ActivitiesModule } from "@/exercises/activities/activities.module";
import { AttributesModule } from "@/exercises/attributes/attributes.module";
import { ExercisesController } from "@/exercises/exercises.controller";
import { ExercisesService } from "@/exercises/exercises.service";
import { RoutinesModule } from "@/exercises/routines/routines.module";

@Module({
	imports: [
		AttributesModule,
		ActivitiesModule,
		ActionTypesModule,
		ActionsModule,
		AuditsModule,
		RoutinesModule,
		RouterModule.register([{
			path: "exercises",
			children: [ActivitiesModule, ActionTypesModule, ActionsModule, RoutinesModule],
		}]),
	],
	controllers: [ExercisesController],
	providers: [ExercisesService],
})
export class ExercisesModule {
}
