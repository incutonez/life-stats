import { ActivitiesApi, EnumActivitySource, EnumUnitTypes } from "@incutonez/life-stats-spec";
import { apiConfig } from "@/api.ts";
import { enumToOptions } from "@/utils/common.ts";

export const ActivitiesAPI = new ActivitiesApi(apiConfig);

export const QueryKeyExercises = "exercises-";

export const QueryListExercisesAudits = `${QueryKeyExercises}listExercisesAudits`;

export const QueryGetActivityTypes = `${QueryKeyExercises}getActivityTypes`;

export const QueryGetActionTypes = `${QueryKeyExercises}getActionTypes`;

export const QueryKeyActivities = `${QueryKeyExercises}activities`;

export const QueryKeyActivity = `${QueryKeyActivities}activity`;

export const QueryRoutines = `${QueryKeyExercises}-routines-`;

export const QueryGetRoutines = `${QueryRoutines}getRoutines`;

export const RouteExercises = "exercises";

export const RouteExercisesActivities = `${RouteExercises}-activities`;

export const RouteViewActivity = `${RouteExercisesActivities}-activity`;

export const RouteViewActivityTabs = {
	details: "details",
	steps: "steps",
	attributes: "attributes",
} as const;

export const RouteExercisesActivitiesStravaSync = `${RouteExercisesActivities}-strava-sync`;

export const RouteExercisesHistory = `${RouteExercises}-history`;

export const RouteExercisesRoutines = `${RouteExercises}-routines`;

export const RouteExercisesRoutine = `${RouteExercises}-routine`;

// We don't want to display None in the UI... they'll just simply remove the value in the combo
export const ActivitySourceOptions = enumToOptions(EnumActivitySource).filter((item) => item.id !== EnumActivitySource.None);

export const UnitTypeOptions = enumToOptions(EnumUnitTypes).sort((lhs, rhs) => lhs.display.localeCompare(rhs.display));
