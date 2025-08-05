import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI, operationServerMap } from '../base';
export const AttributeTypesApiAxiosParamCreator = function (configuration) {
    return {
        deleteAttributeType: async (attributeTypeId, options = {}) => {
            assertParamExists('deleteAttributeType', 'attributeTypeId', attributeTypeId);
            const localVarPath = `/attribute-types/{attributeTypeId}`
                .replace(`{${"attributeTypeId"}}`, encodeURIComponent(String(attributeTypeId)));
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
        getAttributeType: async (attributeTypeId, options = {}) => {
            assertParamExists('getAttributeType', 'attributeTypeId', attributeTypeId);
            const localVarPath = `/attribute-types/{attributeTypeId}`
                .replace(`{${"attributeTypeId"}}`, encodeURIComponent(String(attributeTypeId)));
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
        getAttributeTypes: async (feature, options = {}) => {
            assertParamExists('getAttributeTypes', 'feature', feature);
            const localVarPath = `/attribute-types`;
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            if (feature !== undefined) {
                localVarQueryParameter['feature'] = feature;
            }
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = { ...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers };
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        listAttributeTypes: async (body, options = {}) => {
            assertParamExists('listAttributeTypes', 'body', body);
            const localVarPath = `/attribute-types/list`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        updateAttributeType: async (attributeTypeId, attributeTypeViewModel, options = {}) => {
            assertParamExists('updateAttributeType', 'attributeTypeId', attributeTypeId);
            assertParamExists('updateAttributeType', 'attributeTypeViewModel', attributeTypeViewModel);
            const localVarPath = `/attribute-types/{attributeTypeId}`
                .replace(`{${"attributeTypeId"}}`, encodeURIComponent(String(attributeTypeId)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(attributeTypeViewModel, localVarRequestOptions, configuration);
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
        async deleteAttributeType(attributeTypeId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteAttributeType(attributeTypeId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AttributeTypesApi.deleteAttributeType']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async getAttributeType(attributeTypeId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAttributeType(attributeTypeId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AttributeTypesApi.getAttributeType']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async getAttributeTypes(feature, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAttributeTypes(feature, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AttributeTypesApi.getAttributeTypes']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async listAttributeTypes(body, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listAttributeTypes(body, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AttributeTypesApi.listAttributeTypes']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async updateAttributeType(attributeTypeId, attributeTypeViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateAttributeType(attributeTypeId, attributeTypeViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AttributeTypesApi.updateAttributeType']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    };
};
export const AttributeTypesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = AttributeTypesApiFp(configuration);
    return {
        deleteAttributeType(attributeTypeId, options) {
            return localVarFp.deleteAttributeType(attributeTypeId, options).then((request) => request(axios, basePath));
        },
        getAttributeType(attributeTypeId, options) {
            return localVarFp.getAttributeType(attributeTypeId, options).then((request) => request(axios, basePath));
        },
        getAttributeTypes(feature, options) {
            return localVarFp.getAttributeTypes(feature, options).then((request) => request(axios, basePath));
        },
        listAttributeTypes(body, options) {
            return localVarFp.listAttributeTypes(body, options).then((request) => request(axios, basePath));
        },
        updateAttributeType(attributeTypeId, attributeTypeViewModel, options) {
            return localVarFp.updateAttributeType(attributeTypeId, attributeTypeViewModel, options).then((request) => request(axios, basePath));
        },
    };
};
export class AttributeTypesApi extends BaseAPI {
    deleteAttributeType(attributeTypeId, options) {
        return AttributeTypesApiFp(this.configuration).deleteAttributeType(attributeTypeId, options).then((request) => request(this.axios, this.basePath));
    }
    getAttributeType(attributeTypeId, options) {
        return AttributeTypesApiFp(this.configuration).getAttributeType(attributeTypeId, options).then((request) => request(this.axios, this.basePath));
    }
    getAttributeTypes(feature, options) {
        return AttributeTypesApiFp(this.configuration).getAttributeTypes(feature, options).then((request) => request(this.axios, this.basePath));
    }
    listAttributeTypes(body, options) {
        return AttributeTypesApiFp(this.configuration).listAttributeTypes(body, options).then((request) => request(this.axios, this.basePath));
    }
    updateAttributeType(attributeTypeId, attributeTypeViewModel, options) {
        return AttributeTypesApiFp(this.configuration).updateAttributeType(attributeTypeId, attributeTypeViewModel, options).then((request) => request(this.axios, this.basePath));
    }
}
