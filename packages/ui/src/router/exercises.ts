import { type RouteRecordRaw, useRouter } from "vue-router";
import { useBaseRoutes } from "@/router/routes.ts";
import ViewActivities from "@/views/exercises/ViewActivities.vue";
import ViewExercisesHistory from "@/views/exercises/ViewExercisesHistory.vue";

export const RouteExercises = "exercises";

export const RouteExercisesActivities = `${RouteExercises}-activities`;

export const RouteExercisesHistory = `${RouteExercises}-history`;

export const ExercisesRoutes: RouteRecordRaw = {
	path: "/exercises",
	name: RouteExercises,
	redirect: {
		name: RouteExercisesActivities,
	},
	children: [{
		path: "activities",
		name: RouteExercisesActivities,
		component: ViewActivities,
	}, {
		path: "history",
		name: RouteExercisesHistory,
		component: ViewExercisesHistory,
	}],
};

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
