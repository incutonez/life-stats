import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI, operationServerMap } from '../base';
export const AttributesApiAxiosParamCreator = function (configuration) {
    return {
        deleteAttribute: async (attributeId, options = {}) => {
            assertParamExists('deleteAttribute', 'attributeId', attributeId);
            const localVarPath = `/attributes/{attributeId}`
                .replace(`{${"attributeId"}}`, encodeURIComponent(String(attributeId)));
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
    };
};
export const AttributesApiFp = function (configuration) {
    const localVarAxiosParamCreator = AttributesApiAxiosParamCreator(configuration);
    return {
        async deleteAttribute(attributeId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteAttribute(attributeId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AttributesApi.deleteAttribute']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    };
};
export const AttributesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = AttributesApiFp(configuration);
    return {
        deleteAttribute(attributeId, options) {
            return localVarFp.deleteAttribute(attributeId, options).then((request) => request(axios, basePath));
        },
    };
};
export class AttributesApi extends BaseAPI {
    deleteAttribute(attributeId, options) {
        return AttributesApiFp(this.configuration).deleteAttribute(attributeId, options).then((request) => request(this.axios, this.basePath));
    }
}
