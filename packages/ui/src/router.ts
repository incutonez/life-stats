import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { isAuthenticated } from "@/authentication.ts";
import { restoreRoute, RouteHome, RouteLogin } from "@/constants.ts";
import { ExercisesRoutes } from "@/views/exercises/routes.ts";
import { RouteJobApplications } from "@/views/jobs/constants.ts";
import { JobRoutes } from "@/views/jobs/routes.ts";
import ViewLogIn from "@/views/ViewLogIn.vue";

export const routes: RouteRecordRaw[] = [{
	path: "/",
	name: RouteHome,
	redirect: {
		name: RouteJobApplications,
	},
}, {
	path: "/login",
	name: RouteLogin,
	component: ViewLogIn,
	// eslint-disable-next-line @incutonez/array-bracket-newline
}, JobRoutes, ExercisesRoutes];

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

router.beforeEach(async (to) => {
	// Maybe the user got stuck in the /login path somehow, even though they're logged in, so let's just redirect to Home
	if (isAuthenticated.value && to.name === RouteLogin) {
		return {
			name: RouteHome,
		};
	}
	else if (!isAuthenticated.value && to.name !== RouteLogin) {
		restoreRoute.value = to;
		return {
			name: RouteLogin,
		};
	}
});
