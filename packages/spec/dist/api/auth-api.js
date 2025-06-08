import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI } from '../base';
export const AuthApiAxiosParamCreator = function (configuration) {
    return {
        getStravaToken: async (stravaTokenViewModel, options = {}) => {
            assertParamExists('getStravaToken', 'stravaTokenViewModel', stravaTokenViewModel);
            const localVarPath = `/auth/strava/token`;
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = serializeDataIfNeeded(stravaTokenViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        syncStravaActivities: async (stravaTokenViewModel, options = {}) => {
            assertParamExists('syncStravaActivities', 'stravaTokenViewModel', stravaTokenViewModel);
            const localVarPath = `/auth/strava/sync`;
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = serializeDataIfNeeded(stravaTokenViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
export const AuthApiFp = function (configuration) {
    const localVarAxiosParamCreator = AuthApiAxiosParamCreator(configuration);
    return {
        async getStravaToken(stravaTokenViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getStravaToken(stravaTokenViewModel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async syncStravaActivities(stravaTokenViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.syncStravaActivities(stravaTokenViewModel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    };
};
export const AuthApiFactory = function (configuration, basePath, axios) {
    const localVarFp = AuthApiFp(configuration);
    return {
        getStravaToken(stravaTokenViewModel, options) {
            return localVarFp.getStravaToken(stravaTokenViewModel, options).then((request) => request(axios, basePath));
        },
        syncStravaActivities(stravaTokenViewModel, options) {
            return localVarFp.syncStravaActivities(stravaTokenViewModel, options).then((request) => request(axios, basePath));
        },
    };
};
export class AuthApi extends BaseAPI {
    getStravaToken(stravaTokenViewModel, options) {
        return AuthApiFp(this.configuration).getStravaToken(stravaTokenViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    syncStravaActivities(stravaTokenViewModel, options) {
        return AuthApiFp(this.configuration).syncStravaActivities(stravaTokenViewModel, options).then((request) => request(this.axios, this.basePath));
    }
}
