import { useRouter } from "vue-router";
import { useBaseRoutes } from "@/composables/routes.ts";
import {
	RouteExercises,
	RouteExercisesActivities,
	RouteExercisesActivitiesStravaSync,
	RouteExercisesHistory,
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
