import { ActivitiesApi, EnumActivitySource } from "@incutonez/life-stats-spec";
import { apiConfig } from "@/api.ts";
import { enumToOptions } from "@/utils/common.ts";

export const ActivitiesAPI = new ActivitiesApi(apiConfig);

export const QueryKeyExercises = "exercises-";

export const QueryListExercisesAudits = `${QueryKeyExercises}listExercisesAudits`;

export const QueryGetActivityTypes = `${QueryKeyExercises}getActivityTypes`;

export const QueryKeyActivities = `${QueryKeyExercises}activities`;

export const QueryKeyActivity = `${QueryKeyActivities}activity`;

export const RouteExercises = "exercises";

export const RouteExercisesActivities = `${RouteExercises}-activities`;

export const RouteViewActivity = `${RouteExercisesActivities}-activity`;

export const RouteExercisesActivitiesStravaSync = `${RouteExercisesActivities}-strava-sync`;

export const RouteExercisesHistory = `${RouteExercises}-history`;

// We don't want to display None in the UI... they'll just simply remove the value in the combo
export const ActivitySourceOptions = enumToOptions(EnumActivitySource).filter((item) => item.id !== EnumActivitySource.None);
