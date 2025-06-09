import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI } from '../base';
export const UsersApiAxiosParamCreator = function (configuration) {
    return {
        createUser: async (userCreateViewModel, options = {}) => {
            assertParamExists('createUser', 'userCreateViewModel', userCreateViewModel);
            const localVarPath = `/users`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(userCreateViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        getUserProfile: async (options = {}) => {
            const localVarPath = `/users/profile`;
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
        updateUserSettings: async (userId, userSettingsViewModel, options = {}) => {
            assertParamExists('updateUserSettings', 'userId', userId);
            assertParamExists('updateUserSettings', 'userSettingsViewModel', userSettingsViewModel);
            const localVarPath = `/users/{userId}/settings`
                .replace(`{${"userId"}}`, encodeURIComponent(String(userId)));
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
            localVarRequestOptions.data = serializeDataIfNeeded(userSettingsViewModel, localVarRequestOptions, configuration);
            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    };
};
export const UsersApiFp = function (configuration) {
    const localVarAxiosParamCreator = UsersApiAxiosParamCreator(configuration);
    return {
        async createUser(userCreateViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUser(userCreateViewModel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async getUserProfile(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUserProfile(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        async updateUserSettings(userId, userSettingsViewModel, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateUserSettings(userId, userSettingsViewModel, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    };
};
export const UsersApiFactory = function (configuration, basePath, axios) {
    const localVarFp = UsersApiFp(configuration);
    return {
        createUser(userCreateViewModel, options) {
            return localVarFp.createUser(userCreateViewModel, options).then((request) => request(axios, basePath));
        },
        getUserProfile(options) {
            return localVarFp.getUserProfile(options).then((request) => request(axios, basePath));
        },
        updateUserSettings(userId, userSettingsViewModel, options) {
            return localVarFp.updateUserSettings(userId, userSettingsViewModel, options).then((request) => request(axios, basePath));
        },
    };
};
export class UsersApi extends BaseAPI {
    createUser(userCreateViewModel, options) {
        return UsersApiFp(this.configuration).createUser(userCreateViewModel, options).then((request) => request(this.axios, this.basePath));
    }
    getUserProfile(options) {
        return UsersApiFp(this.configuration).getUserProfile(options).then((request) => request(this.axios, this.basePath));
    }
    updateUserSettings(userId, userSettingsViewModel, options) {
        return UsersApiFp(this.configuration).updateUserSettings(userId, userSettingsViewModel, options).then((request) => request(this.axios, this.basePath));
    }
}
