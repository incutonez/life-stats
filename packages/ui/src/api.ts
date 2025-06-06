import {
	ApplicationsApi,
	AuditsApi,
	CompaniesApi,
	Configuration,
	ExercisesApi,
	JobsApi,
} from "@incutonez/life-stats-spec";
import { ActivitiesApi as ActivitiesStravaApi, Configuration as ConfigurationStrava } from "@incutonez/life-stats-spec-strava";

export const apiConfig = new Configuration({
	basePath: import.meta.env.VITE_BASE_API || `http://${location.hostname}:3000`,
	baseOptions: {
		headers: {},
	},
});

/**
 * Source: https://developers.strava.com/docs/authentication/
 * TODOJEF: Need to use GET https://www.strava.com/oauth/authorize
 * Pass in
 * - client_id
 * - redirect_uri
 * - scope: read
 * - response_type: code
 */
export const ApiStravaConfig = new ConfigurationStrava({
	apiKey: import.meta.env.VITE_STRAVA_CLIENT_SECRET,
	accessToken: import.meta.env.VITE_STRAVA_ACCESS_TOKEN,
});

export const JobsAPI = new JobsApi(apiConfig);

export const ExercisesAPI = new ExercisesApi(apiConfig);

export const ApplicationsAPI = new ApplicationsApi(apiConfig);

export const CompaniesAPI = new CompaniesApi(apiConfig);

export const AuditsAPI = new AuditsApi(apiConfig);

export const StravaActivitiesAPI = new ActivitiesStravaApi(ApiStravaConfig);
