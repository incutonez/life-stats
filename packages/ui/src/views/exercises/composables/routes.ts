import { useRouter } from "vue-router";
import { useBaseRoutes } from "@/composables/routes.ts";
import { RouteCreate } from "@/constants.ts";
import {
	RouteExercises,
	RouteExercisesActivities,
	RouteExercisesActivitiesStravaSync,
	RouteExercisesHistory, RouteViewActivity,
} from "@/views/exercises/constants.ts";

export function useExerciseRoutes() {
	const router = useRouter();
	const { isRouteSelected } = useBaseRoutes(router);

	return {
		isRouteSelected,
		viewExercises() {
			return router.push({
				name: RouteExercises,
			});
		},
		viewActivities() {
			return router.push({
				name: RouteExercisesActivities,
			});
		},
		viewActivity(activityId = RouteCreate) {
			return router.push({
				name: RouteViewActivity,
				params: {
					activityId,
				},
			});
		},
		viewStravaSync() {
			return router.push({
				name: RouteExercisesActivitiesStravaSync,
			});
		},
		viewHistory() {
			return router.push({
				name: RouteExercisesHistory,
			});
		},
	};
}
