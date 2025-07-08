import globalAxios from 'axios';
import { DUMMY_BASE_URL, assertParamExists, setSearchParams, toPathString, createRequestFunction } from '../common';
import { BASE_PATH, BaseAPI, operationServerMap } from '../base';
export const CompaniesApiAxiosParamCreator = function (configuration) {
    return {
        deleteCompany: async (companyId, options = {}) => {
            assertParamExists('deleteCompany', 'companyId', companyId);
            const localVarPath = `/jobs/companies/{companyId}`
                .replace(`{${"companyId"}}`, encodeURIComponent(String(companyId)));
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
        getCompanies: async (options = {}) => {
            const localVarPath = `/jobs/companies`;
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
        getCompaniesList: async (options = {}) => {
            const localVarPath = `/jobs/companies/list`;
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
    };
};
export const CompaniesApiFp = function (configuration) {
    const localVarAxiosParamCreator = CompaniesApiAxiosParamCreator(configuration);
    return {
        async deleteCompany(companyId, options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteCompany(companyId, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CompaniesApi.deleteCompany']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async getCompanies(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCompanies(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CompaniesApi.getCompanies']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        async getCompaniesList(options) {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCompaniesList(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['CompaniesApi.getCompaniesList']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    };
};
export const CompaniesApiFactory = function (configuration, basePath, axios) {
    const localVarFp = CompaniesApiFp(configuration);
    return {
        deleteCompany(companyId, options) {
            return localVarFp.deleteCompany(companyId, options).then((request) => request(axios, basePath));
        },
        getCompanies(options) {
            return localVarFp.getCompanies(options).then((request) => request(axios, basePath));
        },
        getCompaniesList(options) {
            return localVarFp.getCompaniesList(options).then((request) => request(axios, basePath));
        },
    };
};
export class CompaniesApi extends BaseAPI {
    deleteCompany(companyId, options) {
        return CompaniesApiFp(this.configuration).deleteCompany(companyId, options).then((request) => request(this.axios, this.basePath));
    }
    getCompanies(options) {
        return CompaniesApiFp(this.configuration).getCompanies(options).then((request) => request(this.axios, this.basePath));
    }
    getCompaniesList(options) {
        return CompaniesApiFp(this.configuration).getCompaniesList(options).then((request) => request(this.axios, this.basePath));
    }
}
