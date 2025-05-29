import { ref, unref } from "vue";
import { createRouter, createWebHashHistory, type RouteLocationRaw, type RouteRecordRaw } from "vue-router";
import { isAuthenticated } from "@/authentication.ts";
import ViewApplication from "@/views/ViewApplication.vue";
import ViewApplications from "@/views/ViewApplications.vue";
import ViewAudits from "@/views/ViewAudits.vue";
import ViewCompanies from "@/views/ViewCompanies.vue";
import ViewLogIn from "@/views/ViewLogIn.vue";

export const RouteCreate = "create";

export const RouteHome = "home";

export const RouteApplications = "applications";

export const RouteApplication = "application";

export const RouteCompanies = "companies";

export const RouteCompanyApplication = "companies-application";

export const RouteLogin = "login";

export const RouteAudits = "audits";

/**
 * If the user isn't logged in, let's remember the route they were going to, so we can restore it after they log in
 */
export const restoreRoute = ref<RouteLocationRaw>();

export const routes: RouteRecordRaw[] = [{
	path: "/",
	name: RouteHome,
	redirect: {
		name: RouteApplications,
	},
}, {
	path: "/login",
	name: RouteLogin,
	component: ViewLogIn,
}, {
	path: "/applications",
	name: RouteApplications,
	component: ViewApplications,
	children: [{
		path: ":applicationId",
		name: RouteApplication,
		component: ViewApplication,
		props: true,
	}],
}, {
	path: "/companies",
	name: RouteCompanies,
	component: ViewCompanies,
	children: [{
		path: "applications/:applicationId",
		name: RouteCompanyApplication,
		component: ViewApplication,
		props: true,
	}],
}, {
	path: "/audits",
	name: RouteAudits,
	component: ViewAudits,
}];

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

export function viewApplications() {
	return router.push({
		name: RouteApplications,
	});
}

export function viewCompanies() {
	return router.push({
		name: RouteCompanies,
	});
}

export function viewHistory() {
	return router.push({
		name: RouteAudits,
	});
}

export function viewApplication(applicationId: string, routeName = RouteApplication) {
	return router.push({
		name: routeName,
		params: {
			applicationId,
		},
	});
}

export function viewApplicationParent() {
	return router.push({
		name: router.currentRoute.value.matched[0].name,
	});
}

export async function viewRestoredRoute() {
	const $restoreRoute = unref(restoreRoute) ?? {
		name: RouteHome,
	};
	restoreRoute.value = undefined;
	return router.push($restoreRoute);
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
