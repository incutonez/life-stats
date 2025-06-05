import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI } from '../base';
export const ActivitiesApiAxiosParamCreator = function (configuration) {
    return {
        createActivity: async (exerciseActivityCreateViewModel, options = {}) => {
            assertParamExists('createActivity', 'exerciseActivityCreateViewModel', exerciseActivityCreateViewModel);
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
            localVarRequestOptions.data = serializeDataIfNeeded(exerciseActivityCreateViewModel, localVarRequestOptions, configuration);
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
        importActivities: async (source, file, options = {}) => {
            assertParamExists('importActivities', 'source', source);
            assertParamExists('importActivities', 'file', file);
            const localVarPath = `/exercises/activities/import/{source}`
                .replace(`{${"source"}}`, encodeURIComponent(String(source)));
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
        updateActivity: async (activityId, exerciseActivityViewModel, options = {}) => {
            assertParamExists('updateActivity', 'activityId', activityId);
            assertParamExists('updateActivity', 'exerciseActivityViewModel', exerciseActivityViewModel);
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
            localVarRequestOptions.data = serializeDataIfNeeded(exerciseActivityViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        uploadActivities: async (requestBody, options = {}) => {
            assertParamExists('uploadActivities', 'requestBody', requestBody);
            const localVarPath = `/exercises/activities/upload`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(requestBody, localVarRequestOptions, configuration);
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
        async createActivity(exerciseActivityCreateViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createActivity(exerciseActivityCreateViewModel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async deleteActivity(activityId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteActivity(activityId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async getActivity(activityId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActivity(activityId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async importActivities(source, file, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.importActivities(source, file, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async listActivities(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listActivities(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async updateActivity(activityId, exerciseActivityViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateActivity(activityId, exerciseActivityViewModel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async uploadActivities(requestBody, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadActivities(requestBody, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    };
};
export const ActivitiesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = ActivitiesApiFp(configuration);
    return {
        createActivity(exerciseActivityCreateViewModel, options) {
            return localVarFp.createActivity(exerciseActivityCreateViewModel, options).then((request) => request(axios, basePath));
        },
        deleteActivity(activityId, options) {
            return localVarFp.deleteActivity(activityId, options).then((request) => request(axios, basePath));
        },
        getActivity(activityId, options) {
            return localVarFp.getActivity(activityId, options).then((request) => request(axios, basePath));
        },
        importActivities(source, file, options) {
            return localVarFp.importActivities(source, file, options).then((request) => request(axios, basePath));
        },
        listActivities(options) {
            return localVarFp.listActivities(options).then((request) => request(axios, basePath));
        },
        updateActivity(activityId, exerciseActivityViewModel, options) {
            return localVarFp.updateActivity(activityId, exerciseActivityViewModel, options).then((request) => request(axios, basePath));
        },
        uploadActivities(requestBody, options) {
            return localVarFp.uploadActivities(requestBody, options).then((request) => request(axios, basePath));
        },
    };
};
export class ActivitiesApi extends BaseAPI {
    createActivity(exerciseActivityCreateViewModel, options) {
        return ActivitiesApiFp(this.configuration).createActivity(exerciseActivityCreateViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    deleteActivity(activityId, options) {
        return ActivitiesApiFp(this.configuration).deleteActivity(activityId, options).then((request) => request(this.axios, this.basePath));
    }
    getActivity(activityId, options) {
        return ActivitiesApiFp(this.configuration).getActivity(activityId, options).then((request) => request(this.axios, this.basePath));
    }
    importActivities(source, file, options) {
        return ActivitiesApiFp(this.configuration).importActivities(source, file, options).then((request) => request(this.axios, this.basePath));
    }
    listActivities(options) {
        return ActivitiesApiFp(this.configuration).listActivities(options).then((request) => request(this.axios, this.basePath));
    }
    updateActivity(activityId, exerciseActivityViewModel, options) {
        return ActivitiesApiFp(this.configuration).updateActivity(activityId, exerciseActivityViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    uploadActivities(requestBody, options) {
        return ActivitiesApiFp(this.configuration).uploadActivities(requestBody, options).then((request) => request(this.axios, this.basePath));
    }
}
