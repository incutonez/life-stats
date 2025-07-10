import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { CompanyFullListViewModel } from '../models';
import type { CompanyListViewModel } from '../models';
export declare const CompaniesApiAxiosParamCreator: (configuration?: Configuration) => {
    deleteCompany: (companyId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getCompanies: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getCompaniesList: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const CompaniesApiFp: (configuration?: Configuration) => {
    deleteCompany(companyId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getCompanies(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CompanyListViewModel>>;
    getCompaniesList(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CompanyFullListViewModel>>;
};
export declare const CompaniesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    deleteCompany(companyId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getCompanies(options?: RawAxiosRequestConfig): AxiosPromise<CompanyListViewModel>;
    getCompaniesList(options?: RawAxiosRequestConfig): AxiosPromise<CompanyFullListViewModel>;
};
export interface CompaniesApiInterface {
    deleteCompany(companyId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getCompanies(options?: RawAxiosRequestConfig): AxiosPromise<CompanyListViewModel>;
    getCompaniesList(options?: RawAxiosRequestConfig): AxiosPromise<CompanyFullListViewModel>;
}
export declare class CompaniesApi extends BaseAPI implements CompaniesApiInterface {
    deleteCompany(companyId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getCompanies(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<CompanyListViewModel, any>>;
    getCompaniesList(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<CompanyFullListViewModel, any>>;
}
