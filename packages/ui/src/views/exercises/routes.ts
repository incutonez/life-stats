import { type RouteRecordRaw } from "vue-router";
import {
	RouteExercises,
	RouteExercisesActivities,
	RouteExercisesActivitiesStravaSync,
	RouteExercisesHistory, RouteViewActivity,
} from "@/views/exercises/constants.ts";
import ViewActivities from "@/views/exercises/ViewActivities.vue";
import ViewActivity from "@/views/exercises/ViewActivity.vue";
import ViewExercisesHistory from "@/views/exercises/ViewExercisesHistory.vue";
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
			path: ":activityId",
			name: RouteViewActivity,
			component: ViewActivity,
			props: true,
		}],
	}, {
		path: "history",
		name: RouteExercisesHistory,
		component: ViewExercisesHistory,
	}],
};
