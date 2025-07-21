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
    };
};
export const RoutinesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = RoutinesApiFp(configuration);
    return {
        createRoutine(routineViewModel, options) {
            return localVarFp.createRoutine(routineViewModel, options).then((request) => request(axios, basePath));
        },
    };
};
export class RoutinesApi extends BaseAPI {
    createRoutine(routineViewModel, options) {
        return RoutinesApiFp(this.configuration).createRoutine(routineViewModel, options).then((request) => request(this.axios, this.basePath));
    }
}
