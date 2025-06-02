import { ref } from "vue";
import { type RouteLocationRaw, type Router } from "vue-router";

export const RouteCreate = "create";

export const RouteHome = "home";

export const RouteLogin = "login";

/**
 * If the user isn't logged in, let's remember the route they were going to, so we can restore it after they log in
 */
export const restoreRoute = ref<RouteLocationRaw>();

export function useBaseRoutes(router: Router) {
	return {
		isRouteSelected(route: string) {
			const { matched } = router.currentRoute.value;
			for (const match of matched) {
				if (match.name === route) {
					return true;
				}
			}
			return false;
		},
	};
}
