import { ActivitiesApi } from "@incutonez/life-stats-spec";
import { apiConfig } from "@/api.ts";

export const QueryKeyExercises = "exercises-";

export const QueryKeyActivities = `${QueryKeyExercises}activities`;

export const ActivitiesAPI = new ActivitiesApi(apiConfig);
