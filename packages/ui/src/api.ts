import { ApplicationsApi, CompaniesApi, Configuration } from "@incutonez/job-applications-openapi";

export const apiConfig = new Configuration({
	basePath: import.meta.env.VITE_BASE_API || `http://${location.hostname}:3000`,
	baseOptions: {
		headers: {},
	},
});

export const ApplicationsAPI = new ApplicationsApi(apiConfig);

export const CompaniesAPI = new CompaniesApi(apiConfig);
