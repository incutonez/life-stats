import globalAxios from 'axios';
import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI } from '../base';
export const AppApiAxiosParamCreator = function (configuration) {
    return {
        getInfo: async (options = {}) => {
            const localVarPath = `/info`;
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
export const AppApiFp = function (configuration) {
    const localVarAxiosParamCreator = AppApiAxiosParamCreator(configuration);
    return {
        async getInfo(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getInfo(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    };
};
export const AppApiFactory = function (configuration, basePath, axios) {
    const localVarFp = AppApiFp(configuration);
    return {
        getInfo(options) {
            return localVarFp.getInfo(options).then((request) => request(axios, basePath));
        },
    };
};
export class AppApi extends BaseAPI {
    getInfo(options) {
        return AppApiFp(this.configuration).getInfo(options).then((request) => request(this.axios, this.basePath));
    }
}
