import globalAxios from 'axios';
import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI, operationServerMap } from '../base';
export const JobsApiAxiosParamCreator = function (configuration) {
    return {
        getJobsHistory: async (options = {}) => {
            const localVarPath = `/jobs/history`;
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
    };
};
export const JobsApiFp = function (configuration) {
    const localVarAxiosParamCreator = JobsApiAxiosParamCreator(configuration);
    return {
        async getJobsHistory(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getJobsHistory(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['JobsApi.getJobsHistory']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    };
};
export const JobsApiFactory = function (configuration, basePath, axios) {
    const localVarFp = JobsApiFp(configuration);
    return {
        getJobsHistory(options) {
            return localVarFp.getJobsHistory(options).then((request) => request(axios, basePath));
        },
    };
};
export class JobsApi extends BaseAPI {
    getJobsHistory(options) {
        return JobsApiFp(this.configuration).getJobsHistory(options).then((request) => request(this.axios, this.basePath));
    }
}
