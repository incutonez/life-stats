import globalAxios from 'axios';
import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI, operationServerMap } from '../base';
export const ActionTypesApiAxiosParamCreator = function (configuration) {
    return {
        getActionTypes: async (options = {}) => {
            const localVarPath = `/exercises/action-types`;
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
export const ActionTypesApiFp = function (configuration) {
    const localVarAxiosParamCreator = ActionTypesApiAxiosParamCreator(configuration);
    return {
        async getActionTypes(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getActionTypes(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ActionTypesApi.getActionTypes']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    };
};
export const ActionTypesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = ActionTypesApiFp(configuration);
    return {
        getActionTypes(options) {
            return localVarFp.getActionTypes(options).then((request) => request(axios, basePath));
        },
    };
};
export class ActionTypesApi extends BaseAPI {
    getActionTypes(options) {
        return ActionTypesApiFp(this.configuration).getActionTypes(options).then((request) => request(this.axios, this.basePath));
    }
}
