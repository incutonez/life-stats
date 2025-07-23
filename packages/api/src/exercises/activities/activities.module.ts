import { Module } from "@nestjs/common";
import { AttributeTypesModule } from "@/attributeTypes/attributeTypes.module";
import { ActionsModule } from "@/exercises/actions/actions.module";
import { ActionTypesModule } from "@/exercises/actionTypes/actionTypes.module";
import { ActivitiesController } from "@/exercises/activities/activities.controller";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { ActivitiesService } from "@/exercises/activities/activities.service";
import { StravaMapper } from "@/exercises/activities/strava.mapper";
import { StravaService } from "@/exercises/activities/strava.service";
import { ActivitiesRepository, ActivityAttributesRepository, ActivityTypesRepository } from "@/exercises/models";
import { UsersModule } from "@/users/users.module";

@Module({
	imports: [UsersModule, AttributeTypesModule, ActionTypesModule, ActionsModule],
	controllers: [ActivitiesController],
	providers: [ActivitiesService, StravaService, ActivitiesMapper, StravaMapper, ActivitiesRepository, ActivityTypesRepository, ActivityAttributesRepository],
})
export class ActivitiesModule {
}
