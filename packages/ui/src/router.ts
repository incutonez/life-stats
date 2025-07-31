import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import { isAuthenticated } from "@/authentication.ts";
import {
	restoreRoute,
	RouteAttributeType,
	RouteAttributeTypes,
	RouteHome,
	RouteLogin,
	RouteSystem,
} from "@/constants.ts";
import { ExercisesRoutes } from "@/views/exercises/routes.ts";
import { RouteJobApplications } from "@/views/jobs/constants.ts";
import { JobRoutes } from "@/views/jobs/routes.ts";
import ViewAttributeType from "@/views/ViewAttributeType.vue";
import ViewAttributeTypes from "@/views/ViewAttributeTypes.vue";
import ViewLogIn from "@/views/ViewLogIn.vue";

export const routes: RouteRecordRaw[] = [{
	path: "/",
	name: RouteHome,
	redirect: {
		name: RouteJobApplications,
	},
}, {
	path: "/system",
	name: RouteSystem,
	redirect: {
		name: RouteAttributeTypes,
	},
	children: [{
		path: "attributeTypes",
		name: RouteAttributeTypes,
		component: ViewAttributeTypes,
		children: [{
			path: ":attributeTypeId",
			name: RouteAttributeType,
			component: ViewAttributeType,
			props: true,
		}],
	}],
}, {
	path: "/login",
	name: RouteLogin,
	component: ViewLogIn,

},
JobRoutes,
ExercisesRoutes];

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
