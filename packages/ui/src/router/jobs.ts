import { unref } from "vue";
import { type RouteRecordRaw, useRouter } from "vue-router";
import { useBaseRoutes } from "@/router/routes.ts";
import ViewApplication from "@/views/jobs/ViewApplication.vue";
import ViewApplications from "@/views/jobs/ViewApplications.vue";
import ViewCompanies from "@/views/jobs/ViewCompanies.vue";
import ViewJobsHistory from "@/views/jobs/ViewJobsHistory.vue";

export const RouteJobs = "jobs";

export const RouteJobApplications = "jobs-applications";

export const RouteJobApplication = "jobs-application";

export const RouteJobCompanies = "jobs-companies";

export const RouteJobCompanyApplication = "jobs-companies-application";

export const RouteJobsHistory = "jobs-history";

export const JobRoutes: RouteRecordRaw = {
	path: "/jobs",
	name: RouteJobs,
	redirect: {
		name: RouteJobApplications,
	},
	children: [{
		path: "applications",
		name: RouteJobApplications,
		component: ViewApplications,
		children: [{
			path: ":applicationId",
			name: RouteJobApplication,
			component: ViewApplication,
			props: true,
		}],
	}, {
		path: "companies",
		name: RouteJobCompanies,
		component: ViewCompanies,
		children: [{
			path: "applications/:applicationId",
			name: RouteJobCompanyApplication,
			component: ViewApplication,
			props: true,
		}],
	}, {
		path: "history",
		name: RouteJobsHistory,
		component: ViewJobsHistory,
	}],
};

export function useJobRoutes() {
	const router = useRouter();
	const { isRouteSelected } = useBaseRoutes(router);

	return {
		isRouteSelected,
		viewApplications() {
			return router.push({
				name: RouteJobApplications,
			});
		},
		viewApplication(applicationId: string, routeName = RouteJobApplication) {
			return router.push({
				name: routeName,
				params: {
					applicationId,
				},
			});
		},
		viewApplicationParent() {
			const $currentRoute = unref(router.currentRoute);
			return router.push({
				// We subtract 2 instead of using [0] because we want the direct parent, and - 2 will always give us that
				name: $currentRoute.matched[$currentRoute.matched.length - 2].name,
			});
		},
		viewCompanies() {
			return router.push({
				name: RouteJobCompanies,
			});
		},
		viewHistory() {
			return router.push({
				name: RouteJobsHistory,
			});
		},
	};
}
