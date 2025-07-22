import { Provider } from "@nestjs/common";
import { ACTIVITIES_REPOSITORY, ACTIVITY_ACTIONS_REPOSITORY, ROUTINES_REPOSITORY } from "@/exercises/constants";
import { ActionTypeModel } from "@/exercises/models/ActionTypeModel";
import { ActivityActionModel } from "@/exercises/models/ActivityActionModel";
import { ActivityAttributeModel } from "@/exercises/models/ActivityAttributeModel";
import { ActivityModel } from "@/exercises/models/ActivityModel";
import { ActivityTypeModel } from "@/exercises/models/ActivityTypeModel";
import { RoutineActionModel } from "@/exercises/models/RoutineActionModel";
import { RoutineModel } from "@/exercises/models/RoutineModel";

export const ExerciseModels = [ActivityAttributeModel, ActivityModel, ActivityTypeModel, ActivityActionModel, ActionTypeModel, RoutineActionModel, RoutineModel];

export const ActivitiesRepository: Provider = {
	provide: ACTIVITIES_REPOSITORY,
	useValue: ActivityModel,
};

export const RoutinesRepository: Provider = {
	provide: ROUTINES_REPOSITORY,
	useValue: RoutineModel,
};

export const ActivityActionsRepository: Provider = {
	provide: ACTIVITY_ACTIONS_REPOSITORY,
	useValue: ActivityActionModel,
};

export type ActivitiesRepository = typeof ActivityModel;

export type RoutinesRepository = typeof RoutineModel;

export type ActivityActionsRepository = typeof ActivityActionModel;
