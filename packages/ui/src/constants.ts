import { EnumApplicationStatus } from "@incutonez/job-applications-openapi";
import type { IOption } from "@/types/components.ts";
import { enumToOptions } from "@/utils/common.ts";

export const LocalTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const ApplicationStatusOptions = enumToOptions(EnumApplicationStatus);

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
