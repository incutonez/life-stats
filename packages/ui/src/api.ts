import { reactive } from "vue";
import {
	ApplicationsApi,
	AuditsApi,
	CompaniesApi,
	Configuration,
	ExercisesApi,
	JobsApi, UsersApi,
} from "@incutonez/life-stats-spec";

export const apiConfig = reactive(new Configuration({
	basePath: import.meta.env.VITE_BASE_API || `http://${location.hostname}:3000`,
	baseOptions: {
		headers: {},
	},
}));

export const JobsAPI = new JobsApi(apiConfig);

export const ExercisesAPI = new ExercisesApi(apiConfig);

export const ApplicationsAPI = new ApplicationsApi(apiConfig);

export const CompaniesAPI = new CompaniesApi(apiConfig);

export const AuditsAPI = new AuditsApi(apiConfig);

export const UsersAPI = new UsersApi(apiConfig);
