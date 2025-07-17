import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AuditsModule } from "@/audits/audits.module";
import { ActionTypesModule } from "@/exercises/actionTypes/actionTypes.module";
import { ActivitiesModule } from "@/exercises/activities/activities.module";
import { ExercisesController } from "@/exercises/exercises.controller";
import { ExercisesService } from "@/exercises/exercises.service";

@Module({
	imports: [
		ActivitiesModule,
		ActionTypesModule,
		AuditsModule,
		RouterModule.register([{
			path: "exercises",
			children: [ActivitiesModule],
		}]),
	],
	controllers: [ExercisesController],
	providers: [ExercisesService],
})
export class ExercisesModule {
}
