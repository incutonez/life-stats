import { Module } from "@nestjs/common";
import { ActivitiesController } from "@/exercises/activities/activities.controller";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { ActivitiesService } from "@/exercises/activities/activities.service";
import { StravaMapper } from "@/exercises/activities/strava.mapper";
import { StravaService } from "@/exercises/activities/strava.service";
import { UsersModule } from "@/users/users.module";

@Module({
	imports: [UsersModule],
	controllers: [ActivitiesController],
	providers: [ActivitiesService, StravaService, ActivitiesMapper, StravaMapper],
})
export class ActivitiesModule {
}
