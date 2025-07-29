import { Provider } from "@nestjs/common";
import {
	ACTIVITIES_REPOSITORY,
	ACTIVITY_ACTIONS_REPOSITORY,
	ACTIVITY_ATTRIBUTES_REPOSITORY,
	ACTIVITY_TYPES_REPOSITORY,
	ROUTINE_ACTION_TYPES_REPOSITORY,
	ROUTINE_ACTIONS_REPOSITORY,
	ROUTINES_REPOSITORY,
} from "@/exercises/constants";
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

export const ActivityTypesRepository: Provider = {
	provide: ACTIVITY_TYPES_REPOSITORY,
	useValue: ActivityTypeModel,
};

export const ActivityAttributesRepository: Provider = {
	provide: ACTIVITY_ATTRIBUTES_REPOSITORY,
	useValue: ActivityAttributeModel,
};

export const RoutineActionsRepository: Provider = {
	provide: ROUTINE_ACTIONS_REPOSITORY,
	useValue: RoutineActionModel,
};

export const ActionTypesRepository: Provider = {
	provide: ROUTINE_ACTION_TYPES_REPOSITORY,
	useValue: ActionTypeModel,
};

export type ActivitiesRepository = typeof ActivityModel;

export type RoutinesRepository = typeof RoutineModel;

export type ActivityActionsRepository = typeof ActivityActionModel;

export type RoutineActionsRepository = typeof RoutineActionModel;

export type ActivityTypesRepository = typeof ActivityTypeModel;

export type ActivityAttributesRepository = typeof ActivityAttributeModel;

export type ActionTypesRepository = typeof ActionTypeModel;
