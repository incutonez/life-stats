import { type Router, useRouter } from "vue-router";
import { RouteAttributeType, RouteAttributeTypes, RouteSystem } from "@/constants.ts";

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

export function useAppRoutes() {
	const router = useRouter();
	const { isRouteSelected } = useBaseRoutes(router);

	return {
		isRouteSelected,
		viewSystemSettings() {
			return router.push({
				name: RouteSystem,
			});
		},
		viewAttributeTypes() {
			return router.push({
				name: RouteAttributeTypes,
			});
		},
		viewAttributeType(attributeTypeId: string) {
			return router.push({
				name: RouteAttributeType,
				params: {
					attributeTypeId,
				},
			});
		},
	};
}
