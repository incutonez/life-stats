import globalAxios from 'axios';
import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI } from '../base';
export const AuditsApiAxiosParamCreator = function (configuration) {
    return {
        listAudits: async (options = {}) => {
            const localVarPath = `/audits/list`;
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
    };
};
export const AuditsApiFp = function (configuration) {
    const localVarAxiosParamCreator = AuditsApiAxiosParamCreator(configuration);
    return {
        async listAudits(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listAudits(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    };
};
export const AuditsApiFactory = function (configuration, basePath, axios) {
    const localVarFp = AuditsApiFp(configuration);
    return {
        listAudits(options) {
            return localVarFp.listAudits(options).then((request) => request(axios, basePath));
        },
    };
};
export class AuditsApi extends BaseAPI {
    listAudits(options) {
        return AuditsApiFp(this.configuration).listAudits(options).then((request) => request(this.axios, this.basePath));
    }
}
