import { useRouter } from "vue-router";
import { useBaseRoutes } from "@/composables/routes.ts";
import { RouteExercises, RouteExercisesActivities, RouteExercisesHistory } from "@/views/exercises/constants.ts";

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
		ViewActivities() {
			return router.push({
				name: RouteExercisesActivities,
			});
		},
		viewHistory() {
			return router.push({
				name: RouteExercisesHistory,
			});
		},
	};
}
