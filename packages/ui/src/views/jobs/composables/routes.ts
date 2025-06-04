import { unref } from "vue";
import { useRouter } from "vue-router";
import { useBaseRoutes } from "@/composables/routes.ts";
import {
	RouteJobApplication,
	RouteJobApplications,
	RouteJobCompanies,
	RouteJobsHistory,
} from "@/views/jobs/constants.ts";

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
