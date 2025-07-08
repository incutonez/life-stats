import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI, operationServerMap } from '../base';
export const ActivitiesApiAxiosParamCreator = function (configuration) {
    return {
        createActivity: async (activityCreateViewModel, options = {}) => {
            assertParamExists('createActivity', 'activityCreateViewModel', activityCreateViewModel);
            const localVarPath = `/exercises/activities`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(activityCreateViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteActivity: async (activityId, options = {}) => {
            assertParamExists('deleteActivity', 'activityId', activityId);
            const localVarPath = `/exercises/activities/{activityId}`
                .replace(`{${"activityId"}}`, encodeURIComponent(String(activityId)));
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getActivity: async (activityId, options = {}) => {
            assertParamExists('getActivity', 'activityId', activityId);
            const localVarPath = `/exercises/activities/{activityId}`
                .replace(`{${"activityId"}}`, encodeURIComponent(String(activityId)));
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getActivityTypes: async (options = {}) => {
            const localVarPath = `/exercises/activities/activity-types`;
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        importStravaActivities: async (file, options = {}) => {
            assertParamExists('importStravaActivities', 'file', file);
            const localVarPath = `/exercises/activities/strava/import`;
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();
            if (file !== undefined) {
                localVarFormParams.append('file', file);
            }
            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = localVarFormParams;
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        listActivities: async (options = {}) => {
            const localVarPath = `/exercises/activities/list`;
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        syncStravaActivities: async (stravaTokenViewModel, options = {}) => {
            assertParamExists('syncStravaActivities', 'stravaTokenViewModel', stravaTokenViewModel);
            const localVarPath = `/exercises/activities/strava/sync`;
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
        updateActivity: async (activityId, activityViewModel, options = {}) => {
            assertParamExists('updateActivity', 'activityId', activityId);
            assertParamExists('updateActivity', 'activityViewModel', activityViewModel);
            const localVarPath = `/exercises/activities/{activityId}`
                .replace(`{${"activityId"}}`, encodeURIComponent(String(activityId)));
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            localVarHeaderParameter['Content-Type'] = 'application/json';
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            localVarRequestOptions.data = serializeDataIfNeeded(activityViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        uploadStravaActivities: async (activityCreateViewModel, options = {}) => {
            assertParamExists('uploadStravaActivities', 'activityCreateViewModel', activityCreateViewModel);
            const localVarPath = `/exercises/activities/strava/upload`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(activityCreateViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
export const ActivitiesApiFp = function (configuration) {
    const localVarAxiosParamCreator = ActivitiesApiAxiosParamCreator(configuration);
    return {
        async createActivity(activityCreateViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createActivity(activityCreateViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActivitiesApi.createActivity']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async deleteActivity(activityId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteActivity(activityId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActivitiesApi.deleteActivity']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async getActivity(activityId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActivity(activityId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActivitiesApi.getActivity']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async getActivityTypes(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActivityTypes(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActivitiesApi.getActivityTypes']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async importStravaActivities(file, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.importStravaActivities(file, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActivitiesApi.importStravaActivities']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async listActivities(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listActivities(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActivitiesApi.listActivities']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async syncStravaActivities(stravaTokenViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.syncStravaActivities(stravaTokenViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActivitiesApi.syncStravaActivities']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async updateActivity(activityId, activityViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateActivity(activityId, activityViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActivitiesApi.updateActivity']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async uploadStravaActivities(activityCreateViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadStravaActivities(activityCreateViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActivitiesApi.uploadStravaActivities']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    };
};
export const ActivitiesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = ActivitiesApiFp(configuration);
    return {
        createActivity(activityCreateViewModel, options) {
            return localVarFp.createActivity(activityCreateViewModel, options).then((request) => request(axios, basePath));
        },
        deleteActivity(activityId, options) {
            return localVarFp.deleteActivity(activityId, options).then((request) => request(axios, basePath));
        },
        getActivity(activityId, options) {
            return localVarFp.getActivity(activityId, options).then((request) => request(axios, basePath));
        },
        getActivityTypes(options) {
            return localVarFp.getActivityTypes(options).then((request) => request(axios, basePath));
        },
        importStravaActivities(file, options) {
            return localVarFp.importStravaActivities(file, options).then((request) => request(axios, basePath));
        },
        listActivities(options) {
            return localVarFp.listActivities(options).then((request) => request(axios, basePath));
        },
        syncStravaActivities(stravaTokenViewModel, options) {
            return localVarFp.syncStravaActivities(stravaTokenViewModel, options).then((request) => request(axios, basePath));
        },
        updateActivity(activityId, activityViewModel, options) {
            return localVarFp.updateActivity(activityId, activityViewModel, options).then((request) => request(axios, basePath));
        },
        uploadStravaActivities(activityCreateViewModel, options) {
            return localVarFp.uploadStravaActivities(activityCreateViewModel, options).then((request) => request(axios, basePath));
        },
    };
};
export class ActivitiesApi extends BaseAPI {
    createActivity(activityCreateViewModel, options) {
        return ActivitiesApiFp(this.configuration).createActivity(activityCreateViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    deleteActivity(activityId, options) {
        return ActivitiesApiFp(this.configuration).deleteActivity(activityId, options).then((request) => request(this.axios, this.basePath));
    }
    getActivity(activityId, options) {
        return ActivitiesApiFp(this.configuration).getActivity(activityId, options).then((request) => request(this.axios, this.basePath));
    }
    getActivityTypes(options) {
        return ActivitiesApiFp(this.configuration).getActivityTypes(options).then((request) => request(this.axios, this.basePath));
    }
    importStravaActivities(file, options) {
        return ActivitiesApiFp(this.configuration).importStravaActivities(file, options).then((request) => request(this.axios, this.basePath));
    }
    listActivities(options) {
        return ActivitiesApiFp(this.configuration).listActivities(options).then((request) => request(this.axios, this.basePath));
    }
    syncStravaActivities(stravaTokenViewModel, options) {
        return ActivitiesApiFp(this.configuration).syncStravaActivities(stravaTokenViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    updateActivity(activityId, activityViewModel, options) {
        return ActivitiesApiFp(this.configuration).updateActivity(activityId, activityViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    uploadStravaActivities(activityCreateViewModel, options) {
        return ActivitiesApiFp(this.configuration).uploadStravaActivities(activityCreateViewModel, options).then((request) => request(this.axios, this.basePath));
    }
}
