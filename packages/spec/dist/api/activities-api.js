import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, toPathString, createRequestFunction } from '../common';
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
        uploadActivityFromSource: async (source, file, options = {}) => {
            assertParamExists('uploadActivityFromSource', 'source', source);
            assertParamExists('uploadActivityFromSource', 'file', file);
            const localVarPath = `/exercises/activities/upload/{source}`
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
    };
};
export const ActivitiesApiFp = function (configuration) {
    const localVarAxiosParamCreator = ActivitiesApiAxiosParamCreator(configuration);
    return {
        async getActivity(activityId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActivity(activityId, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async uploadActivityFromSource(source, file, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadActivityFromSource(source, file, options);
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
        uploadActivityFromSource(source, file, options) {
            return localVarFp.uploadActivityFromSource(source, file, options).then((request) => request(axios, basePath));
        },
    };
};
export class ActivitiesApi extends BaseAPI {
    getActivity(activityId, options) {
        return ActivitiesApiFp(this.configuration).getActivity(activityId, options).then((request) => request(this.axios, this.basePath));
    }
    uploadActivityFromSource(source, file, options) {
        return ActivitiesApiFp(this.configuration).uploadActivityFromSource(source, file, options).then((request) => request(this.axios, this.basePath));
    }
}
