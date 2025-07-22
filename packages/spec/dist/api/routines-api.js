import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI, operationServerMap } from '../base';
export const RoutinesApiAxiosParamCreator = function (configuration) {
    return {
        createRoutine: async (routineViewModel, options = {}) => {
            assertParamExists('createRoutine', 'routineViewModel', routineViewModel);
            const localVarPath = `/exercises/routines`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(routineViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        deleteRoutine: async (routineId, options = {}) => {
            assertParamExists('deleteRoutine', 'routineId', routineId);
            const localVarPath = `/exercises/routines/{routineId}`
                .replace(`{${"routineId"}}`, encodeURIComponent(String(routineId)));
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
        getRoutine: async (routineId, options = {}) => {
            assertParamExists('getRoutine', 'routineId', routineId);
            const localVarPath = `/exercises/routines/{routineId}`
                .replace(`{${"routineId"}}`, encodeURIComponent(String(routineId)));
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
        getRoutines: async (options = {}) => {
            const localVarPath = `/exercises/routines`;
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
        updateRoutine: async (routineId, routineViewModel, options = {}) => {
            assertParamExists('updateRoutine', 'routineId', routineId);
            assertParamExists('updateRoutine', 'routineViewModel', routineViewModel);
            const localVarPath = `/exercises/routines/{routineId}`
                .replace(`{${"routineId"}}`, encodeURIComponent(String(routineId)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(routineViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
export const RoutinesApiFp = function (configuration) {
    const localVarAxiosParamCreator = RoutinesApiAxiosParamCreator(configuration);
    return {
        async createRoutine(routineViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createRoutine(routineViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RoutinesApi.createRoutine']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async deleteRoutine(routineId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteRoutine(routineId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RoutinesApi.deleteRoutine']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async getRoutine(routineId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getRoutine(routineId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RoutinesApi.getRoutine']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async getRoutines(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getRoutines(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RoutinesApi.getRoutines']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async updateRoutine(routineId, routineViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateRoutine(routineId, routineViewModel, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['RoutinesApi.updateRoutine']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    };
};
export const RoutinesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = RoutinesApiFp(configuration);
    return {
        createRoutine(routineViewModel, options) {
            return localVarFp.createRoutine(routineViewModel, options).then((request) => request(axios, basePath));
        },
        deleteRoutine(routineId, options) {
            return localVarFp.deleteRoutine(routineId, options).then((request) => request(axios, basePath));
        },
        getRoutine(routineId, options) {
            return localVarFp.getRoutine(routineId, options).then((request) => request(axios, basePath));
        },
        getRoutines(options) {
            return localVarFp.getRoutines(options).then((request) => request(axios, basePath));
        },
        updateRoutine(routineId, routineViewModel, options) {
            return localVarFp.updateRoutine(routineId, routineViewModel, options).then((request) => request(axios, basePath));
        },
    };
};
export class RoutinesApi extends BaseAPI {
    createRoutine(routineViewModel, options) {
        return RoutinesApiFp(this.configuration).createRoutine(routineViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    deleteRoutine(routineId, options) {
        return RoutinesApiFp(this.configuration).deleteRoutine(routineId, options).then((request) => request(this.axios, this.basePath));
    }
    getRoutine(routineId, options) {
        return RoutinesApiFp(this.configuration).getRoutine(routineId, options).then((request) => request(this.axios, this.basePath));
    }
    getRoutines(options) {
        return RoutinesApiFp(this.configuration).getRoutines(options).then((request) => request(this.axios, this.basePath));
    }
    updateRoutine(routineId, routineViewModel, options) {
        return RoutinesApiFp(this.configuration).updateRoutine(routineId, routineViewModel, options).then((request) => request(this.axios, this.basePath));
    }
}
