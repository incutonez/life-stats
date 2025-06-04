import { ActivitiesApi } from "@incutonez/life-stats-spec";
import { apiConfig } from "@/api.ts";

export const ActivitiesAPI = new ActivitiesApi(apiConfig);

export const QueryKeyExercises = "exercises-";

export const QueryListExercisesAudits = `${QueryKeyExercises}listExercisesAudits`;

export const QueryKeyActivities = `${QueryKeyExercises}activities`;

export const RouteExercises = "exercises";

export const RouteExercisesActivities = `${RouteExercises}-activities`;

export const RouteExercisesHistory = `${RouteExercises}-history`;
