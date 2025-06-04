import { type Router } from "vue-router";

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
