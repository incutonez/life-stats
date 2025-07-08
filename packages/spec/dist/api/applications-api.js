import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI, operationServerMap } from '../base';
export const ApplicationsApiAxiosParamCreator = function (configuration) {
    return {
        createApplication: async (applicationViewModel, options = {}) => {
            assertParamExists('createApplication', 'applicationViewModel', applicationViewModel);
            const localVarPath = `/jobs/applications`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(applicationViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        createApplications: async (applicationViewModel, options = {}) => {
            assertParamExists('createApplications', 'applicationViewModel', applicationViewModel);
            const localVarPath = `/jobs/applications/bulk`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(applicationViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteApplication: async (applicationId, options = {}) => {
            assertParamExists('deleteApplication', 'applicationId', applicationId);
            const localVarPath = `/jobs/applications/{applicationId}`
                .replace(`{${"applicationId"}}`, encodeURIComponent(String(applicationId)));
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
        getApplication: async (applicationId, options = {}) => {
            assertParamExists('getApplication', 'applicationId', applicationId);
            const localVarPath = `/jobs/applications/{applicationId}`
                .replace(`{${"applicationId"}}`, encodeURIComponent(String(applicationId)));
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
        listApplications: async (apiPaginatedRequest, options = {}) => {
            assertParamExists('listApplications', 'apiPaginatedRequest', apiPaginatedRequest);
            const localVarPath = `/jobs/applications/list`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(apiPaginatedRequest, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        updateApplication: async (applicationId, applicationViewModel, options = {}) => {
            assertParamExists('updateApplication', 'applicationId', applicationId);
            assertParamExists('updateApplication', 'applicationViewModel', applicationViewModel);
            const localVarPath = `/jobs/applications/{applicationId}`
                .replace(`{${"applicationId"}}`, encodeURIComponent(String(applicationId)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(applicationViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        uploadApplications: async (addHeaders, file, options = {}) => {
            assertParamExists('uploadApplications', 'addHeaders', addHeaders);
            assertParamExists('uploadApplications', 'file', file);
            const localVarPath = `/jobs/applications/upload`;
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options };
            const localVarHeaderParameter = {};
            const localVarQueryParameter = {};
            const localVarFormParams = new ((configuration && configuration.formDataCtor) || FormData)();
            if (addHeaders !== undefined) {
                localVarFormParams.append('addHeaders', addHeaders);
            }
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
export const ApplicationsApiFp = function (configuration) {
    const localVarAxiosParamCreator = ApplicationsApiAxiosParamCreator(configuration);
    return {
        async createApplication(applicationViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createApplication(applicationViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplicationsApi.createApplication']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async createApplications(applicationViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createApplications(applicationViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplicationsApi.createApplications']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async deleteApplication(applicationId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteApplication(applicationId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplicationsApi.deleteApplication']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async getApplication(applicationId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getApplication(applicationId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplicationsApi.getApplication']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async listApplications(apiPaginatedRequest, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listApplications(apiPaginatedRequest, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplicationsApi.listApplications']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async updateApplication(applicationId, applicationViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateApplication(applicationId, applicationViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplicationsApi.updateApplication']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async uploadApplications(addHeaders, file, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.uploadApplications(addHeaders, file, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['ApplicationsApi.uploadApplications']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    };
};
export const ApplicationsApiFactory = function (configuration, basePath, axios) {
    const localVarFp = ApplicationsApiFp(configuration);
    return {
        createApplication(applicationViewModel, options) {
            return localVarFp.createApplication(applicationViewModel, options).then((request) => request(axios, basePath));
        },
        createApplications(applicationViewModel, options) {
            return localVarFp.createApplications(applicationViewModel, options).then((request) => request(axios, basePath));
        },
        deleteApplication(applicationId, options) {
            return localVarFp.deleteApplication(applicationId, options).then((request) => request(axios, basePath));
        },
        getApplication(applicationId, options) {
            return localVarFp.getApplication(applicationId, options).then((request) => request(axios, basePath));
        },
        listApplications(apiPaginatedRequest, options) {
            return localVarFp.listApplications(apiPaginatedRequest, options).then((request) => request(axios, basePath));
        },
        updateApplication(applicationId, applicationViewModel, options) {
            return localVarFp.updateApplication(applicationId, applicationViewModel, options).then((request) => request(axios, basePath));
        },
        uploadApplications(addHeaders, file, options) {
            return localVarFp.uploadApplications(addHeaders, file, options).then((request) => request(axios, basePath));
        },
    };
};
export class ApplicationsApi extends BaseAPI {
    createApplication(applicationViewModel, options) {
        return ApplicationsApiFp(this.configuration).createApplication(applicationViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    createApplications(applicationViewModel, options) {
        return ApplicationsApiFp(this.configuration).createApplications(applicationViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    deleteApplication(applicationId, options) {
        return ApplicationsApiFp(this.configuration).deleteApplication(applicationId, options).then((request) => request(this.axios, this.basePath));
    }
    getApplication(applicationId, options) {
        return ApplicationsApiFp(this.configuration).getApplication(applicationId, options).then((request) => request(this.axios, this.basePath));
    }
    listApplications(apiPaginatedRequest, options) {
        return ApplicationsApiFp(this.configuration).listApplications(apiPaginatedRequest, options).then((request) => request(this.axios, this.basePath));
    }
    updateApplication(applicationId, applicationViewModel, options) {
        return ApplicationsApiFp(this.configuration).updateApplication(applicationId, applicationViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    uploadApplications(addHeaders, file, options) {
        return ApplicationsApiFp(this.configuration).uploadApplications(addHeaders, file, options).then((request) => request(this.axios, this.basePath));
    }
}
