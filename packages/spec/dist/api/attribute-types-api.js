import globalAxios from 'axios';
import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI, operationServerMap } from '../base';
export const AttributeTypesApiAxiosParamCreator = function (configuration) {
    return {
        getAttributeTypes: async (options = {}) => {
            const localVarPath = `/attribute-types`;
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
export const AttributeTypesApiFp = function (configuration) {
    const localVarAxiosParamCreator = AttributeTypesApiAxiosParamCreator(configuration);
    return {
        async getAttributeTypes(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAttributeTypes(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AttributeTypesApi.getAttributeTypes']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    };
};
export const AttributeTypesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = AttributeTypesApiFp(configuration);
    return {
        getAttributeTypes(options) {
            return localVarFp.getAttributeTypes(options).then((request) => request(axios, basePath));
        },
    };
};
export class AttributeTypesApi extends BaseAPI {
    getAttributeTypes(options) {
        return AttributeTypesApiFp(this.configuration).getAttributeTypes(options).then((request) => request(this.axios, this.basePath));
    }
}
