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

export const QueryKeyJobs = "jobs-";

export const QueryListJobAudits = `${QueryKeyJobs}listJobAudits`;

export const QueryListExercisesAudits = "listExercisesAudits";

export const QueryListApplications = `${QueryKeyJobs}listApplications`;

export const QueryGetApplication = `${QueryKeyJobs}getApplication`;

export const QueryListCompanies = `${QueryKeyJobs}listCompanies`;

export const QueryGetCompanies = `${QueryKeyJobs}getCompanies`;
