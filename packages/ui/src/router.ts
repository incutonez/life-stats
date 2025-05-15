import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";
import ViewApplication from "@/views/ViewApplication.vue";
import ViewApplications from "@/views/ViewApplications.vue";
import ViewCompanies from "@/views/ViewCompanies.vue";

export const RouteCreate = "create";

export const RouteHome = "home";

export const RouteApplications = "applications";

export const RouteApplication = "application";

export const RouteCompanies = "companies";

export const RouteCompanyApplication = "companies-application";

export const routes: RouteRecordRaw[] = [{
	path: "/",
	name: RouteHome,
	redirect: {
		name: RouteApplications,
	},
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
