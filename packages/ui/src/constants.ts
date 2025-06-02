import { EnumApplicationStatus } from "@incutonez/life-stats-spec";
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

export const QueryListAudits = "listAudits";

export const QueryListApplications = "listApplications";

export const QueryGetApplication = "getApplication";

export const QueryListCompanies = "listCompanies";

export const QueryGetCompanies = "getCompanies";
