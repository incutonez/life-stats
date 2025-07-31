import { forwardRef, Module } from "@nestjs/common";
import { ActionsModule } from "@/exercises/actions/actions.module";
import { ActivitiesController } from "@/exercises/activities/activities.controller";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { ActivitiesService } from "@/exercises/activities/activities.service";
import { StravaMapper } from "@/exercises/activities/strava.mapper";
import { StravaService } from "@/exercises/activities/strava.service";
import { AttributesModule } from "@/exercises/attributes/attributes.module";
import { ActivitiesRepository, ActivityAttributesRepository, ActivityTypesRepository } from "@/exercises/models";
import { UsersModule } from "@/users/users.module";

@Module({
	imports: [UsersModule, ActionsModule, forwardRef(() => AttributesModule)],
	controllers: [ActivitiesController],
	providers: [ActivitiesService, StravaService, ActivitiesMapper, StravaMapper, ActivitiesRepository, ActivityTypesRepository, ActivityAttributesRepository],
})
export class ActivitiesModule {
}
