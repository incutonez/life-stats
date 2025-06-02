import globalAxios from 'axios';
import { DUMMY_BASE_URL, setSearchParams, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI } from '../base';
export const ExercisesApiAxiosParamCreator = function (configuration) {
    return {
        getExercisesHistory: async (options = {}) => {
            const localVarPath = `/exercises/history`;
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
export const ExercisesApiFp = function (configuration) {
    const localVarAxiosParamCreator = ExercisesApiAxiosParamCreator(configuration);
    return {
        async getExercisesHistory(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getExercisesHistory(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    };
};
export const ExercisesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = ExercisesApiFp(configuration);
    return {
        getExercisesHistory(options) {
            return localVarFp.getExercisesHistory(options).then((request) => request(axios, basePath));
        },
    };
};
export class ExercisesApi extends BaseAPI {
    getExercisesHistory(options) {
        return ExercisesApiFp(this.configuration).getExercisesHistory(options).then((request) => request(this.axios, this.basePath));
    }
}
