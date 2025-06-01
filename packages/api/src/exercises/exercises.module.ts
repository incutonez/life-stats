import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ActivitiesModule } from "@/exercises/activities/activities.module";

@Module({
	imports: [
		ActivitiesModule,
		RouterModule.register([{
			path: "exercises",
			children: [ActivitiesModule],
		}])],
})
export class ExercisesModule {
}
