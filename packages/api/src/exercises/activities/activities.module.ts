import { Module } from "@nestjs/common";
import { ActivitiesController } from "@/exercises/activities/activities.controller";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { ActivitiesService } from "@/exercises/activities/activities.service";

@Module({
	controllers: [ActivitiesController],
	providers: [ActivitiesService, ActivitiesMapper],
})
export class ActivitiesModule {
}
