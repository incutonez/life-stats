import { type RouteRecordRaw } from "vue-router";
import {
	RouteExercises,
	RouteExercisesActivities,
	RouteExercisesActivitiesStravaSync,
	RouteExercisesHistory, RouteExercisesRoutine, RouteExercisesRoutines, RouteViewActivity,
} from "@/views/exercises/constants.ts";
import ViewActivities from "@/views/exercises/ViewActivities.vue";
import ViewActivity from "@/views/exercises/ViewActivity.vue";
import ViewExercisesHistory from "@/views/exercises/ViewExercisesHistory.vue";
import ViewRoutine from "@/views/exercises/ViewRoutine.vue";
import ViewRoutines from "@/views/exercises/ViewRoutines.vue";
import ViewSyncStrava from "@/views/exercises/ViewSyncStrava.vue";

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
		children: [{
			path: "syncStrava",
			name: RouteExercisesActivitiesStravaSync,
			component: ViewSyncStrava,
		}, {
			path: ":activityId/:tabId",
			name: RouteViewActivity,
			component: ViewActivity,
			props: true,
		}],
	}, {
		path: "routines",
		name: RouteExercisesRoutines,
		component: ViewRoutines,
		children: [{
			path: ":routineId",
			name: RouteExercisesRoutine,
			component: ViewRoutine,
			props: true,
		}],
	}, {
		path: "history",
		name: RouteExercisesHistory,
		component: ViewExercisesHistory,
	}],
};
