import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { CompanyFullListViewModel } from '../models';
import { CompanyListViewModel } from '../models';
export declare const CompaniesApiAxiosParamCreator: (configuration?: Configuration) => {
    deleteCompany: (companyId: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    getCompanies: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
    getCompaniesList: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const CompaniesApiFp: (configuration?: Configuration) => {
    deleteCompany(companyId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getCompanies(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CompanyListViewModel>>;
    getCompaniesList(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CompanyFullListViewModel>>;
};
export declare const CompaniesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    deleteCompany(companyId: string, options?: any): AxiosPromise<void>;
    getCompanies(options?: any): AxiosPromise<CompanyListViewModel>;
    getCompaniesList(options?: any): AxiosPromise<CompanyFullListViewModel>;
};
export interface CompaniesApiInterface {
    deleteCompany(companyId: string, options?: AxiosRequestConfig): AxiosPromise<void>;
    getCompanies(options?: AxiosRequestConfig): AxiosPromise<CompanyListViewModel>;
    getCompaniesList(options?: AxiosRequestConfig): AxiosPromise<CompanyFullListViewModel>;
}
export declare class CompaniesApi extends BaseAPI implements CompaniesApiInterface {
    deleteCompany(companyId: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getCompanies(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<CompanyListViewModel, any>>;
    getCompaniesList(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<CompanyFullListViewModel, any>>;
}
