import { ref, unref } from "vue";
import { createRouter, createWebHashHistory, type RouteLocationRaw, type RouteRecordRaw } from "vue-router";
import { isAuthenticated } from "@/authentication.ts";
import { JobRoutes, RouteJobApplications } from "@/router/jobs.ts";
import ViewLogIn from "@/views/ViewLogIn.vue";

export const RouteCreate = "create";

export const RouteHome = "home";

export const RouteLogin = "login";

/**
 * If the user isn't logged in, let's remember the route they were going to, so we can restore it after they log in
 */
export const restoreRoute = ref<RouteLocationRaw>();

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
}, JobRoutes];

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

export async function viewRestoredRoute() {
	const $restoreRoute = unref(restoreRoute) ?? {
		name: RouteHome,
	};
	restoreRoute.value = undefined;
	return router.push($restoreRoute);
}

export function isRouteSelected(route: string) {
	const { matched } = router.currentRoute.value;
	for (const match of matched) {
		if (match.name === route) {
			return true;
		}
	}
	return false;
}

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
