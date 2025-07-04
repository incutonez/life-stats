/* tslint:disable */
/* eslint-disable */
/**
 * API
 * The main API for the UI
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { AppMetaViewModel } from '../models';
/**
 * AppApi - axios parameter creator
 * @export
 */
export const AppApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInfo: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/info`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AppApi - functional programming interface
 * @export
 */
export const AppApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AppApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getInfo(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppMetaViewModel>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getInfo(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * AppApi - factory interface
 * @export
 */
export const AppApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AppApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getInfo(options?: any): AxiosPromise<AppMetaViewModel> {
            return localVarFp.getInfo(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AppApi - interface
 * @export
 * @interface AppApi
 */
export interface AppApiInterface {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppApiInterface
     */
    getInfo(options?: AxiosRequestConfig): AxiosPromise<AppMetaViewModel>;

}

/**
 * AppApi - object-oriented interface
 * @export
 * @class AppApi
 * @extends {BaseAPI}
 */
export class AppApi extends BaseAPI implements AppApiInterface {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AppApi
     */
    public getInfo(options?: AxiosRequestConfig) {
        return AppApiFp(this.configuration).getInfo(options).then((request) => request(this.axios, this.basePath));
    }
}
