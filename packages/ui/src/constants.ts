import { ref } from "vue";
import type { RouteLocationRaw } from "vue-router";
import type { IOption } from "@/types/components.ts";

export const UserLanguage = navigator.language;

export const LocalTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const TablePageSizes: IOption[] = [{
	id: 25,
	display: "25",
}, {
	id: 50,
	display: "50",
}, {
	id: 100,
	display: "100",
}, {
	id: 250,
	display: "250",
}];

export const ColumnFitWidth = {
	columnWidth: "w-fit",
	cellCls: "w-max whitespace-nowrap",
};

export const RouteCreate = "create";

export const RouteHome = "home";

export const RouteSystem = "system";

export const RouteAttributeTypes = "attributeTypes";

export const RouteAttributeType = `${RouteAttributeTypes}-attributeType`;

export const RouteLogin = "login";

/**
 * If the user isn't logged in, let's remember the route they were going to, so we can restore it after they log in
 */
export const restoreRoute = ref<RouteLocationRaw>();

export const QueryKeySystem = "system-";

export const QueryKeyUser = `${QueryKeySystem}user`;

export const QueryKeyAppMeta = `${QueryKeySystem}appMeta`;

export const QueryGetAttributeTypes = `${QueryKeySystem}getAttributeTypes`;
