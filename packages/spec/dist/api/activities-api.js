import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI } from '../base';
export const ActivitiesApiAxiosParamCreator = function (configuration) {
    return {
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
        uploadActivities: async (exerciseActivityCreateViewModel, options = {}) => {
            assertParamExists('uploadActivities', 'exerciseActivityCreateViewModel', exerciseActivityCreateViewModel);
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
            localVarRequestOptions.data = serializeDataIfNeeded(exerciseActivityCreateViewModel, localVarRequestOptions, configuration);
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
        async uploadActivities(exerciseActivityCreateViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadActivities(exerciseActivityCreateViewModel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    };
};
export const ActivitiesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = ActivitiesApiFp(configuration);
    return {
        getActivity(activityId, options) {
            return localVarFp.getActivity(activityId, options).then((request) => request(axios, basePath));
        },
        importActivities(source, file, options) {
            return localVarFp.importActivities(source, file, options).then((request) => request(axios, basePath));
        },
        listActivities(options) {
            return localVarFp.listActivities(options).then((request) => request(axios, basePath));
        },
        uploadActivities(exerciseActivityCreateViewModel, options) {
            return localVarFp.uploadActivities(exerciseActivityCreateViewModel, options).then((request) => request(axios, basePath));
        },
    };
};
export class ActivitiesApi extends BaseAPI {
    getActivity(activityId, options) {
        return ActivitiesApiFp(this.configuration).getActivity(activityId, options).then((request) => request(this.axios, this.basePath));
    }
    importActivities(source, file, options) {
        return ActivitiesApiFp(this.configuration).importActivities(source, file, options).then((request) => request(this.axios, this.basePath));
    }
    listActivities(options) {
        return ActivitiesApiFp(this.configuration).listActivities(options).then((request) => request(this.axios, this.basePath));
    }
    uploadActivities(exerciseActivityCreateViewModel, options) {
        return ActivitiesApiFp(this.configuration).uploadActivities(exerciseActivityCreateViewModel, options).then((request) => request(this.axios, this.basePath));
    }
}
