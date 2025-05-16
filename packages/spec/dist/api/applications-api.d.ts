import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { ApiPaginatedRequest } from '../models';
import { ApplicationListViewModel } from '../models';
import { ApplicationViewModel } from '../models';
export declare const ApplicationsApiAxiosParamCreator: (configuration?: Configuration) => {
    createApplication: (applicationViewModel: ApplicationViewModel, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    createApplications: (applicationViewModel: Array<ApplicationViewModel>, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    deleteApplication: (applicationId: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    getApplication: (applicationId: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    listApplications: (apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    updateApplication: (applicationId: string, applicationViewModel: ApplicationViewModel, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    uploadApplications: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const ApplicationsApiFp: (configuration?: Configuration) => {
    createApplication(applicationViewModel: ApplicationViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>>;
    createApplications(applicationViewModel: Array<ApplicationViewModel>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>>;
    deleteApplication(applicationId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getApplication(applicationId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplicationViewModel>>;
    listApplications(apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplicationListViewModel>>;
    updateApplication(applicationId: string, applicationViewModel: ApplicationViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplicationViewModel>>;
    uploadApplications(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<object>>>;
};
export declare const ApplicationsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createApplication(applicationViewModel: ApplicationViewModel, options?: any): AxiosPromise<object>;
    createApplications(applicationViewModel: Array<ApplicationViewModel>, options?: any): AxiosPromise<object>;
    deleteApplication(applicationId: string, options?: any): AxiosPromise<void>;
    getApplication(applicationId: string, options?: any): AxiosPromise<ApplicationViewModel>;
    listApplications(apiPaginatedRequest: ApiPaginatedRequest, options?: any): AxiosPromise<ApplicationListViewModel>;
    updateApplication(applicationId: string, applicationViewModel: ApplicationViewModel, options?: any): AxiosPromise<ApplicationViewModel>;
    uploadApplications(options?: any): AxiosPromise<Array<object>>;
};
export interface ApplicationsApiInterface {
    createApplication(applicationViewModel: ApplicationViewModel, options?: AxiosRequestConfig): AxiosPromise<object>;
    createApplications(applicationViewModel: Array<ApplicationViewModel>, options?: AxiosRequestConfig): AxiosPromise<object>;
    deleteApplication(applicationId: string, options?: AxiosRequestConfig): AxiosPromise<void>;
    getApplication(applicationId: string, options?: AxiosRequestConfig): AxiosPromise<ApplicationViewModel>;
    listApplications(apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig): AxiosPromise<ApplicationListViewModel>;
    updateApplication(applicationId: string, applicationViewModel: ApplicationViewModel, options?: AxiosRequestConfig): AxiosPromise<ApplicationViewModel>;
    uploadApplications(options?: AxiosRequestConfig): AxiosPromise<Array<object>>;
}
export declare class ApplicationsApi extends BaseAPI implements ApplicationsApiInterface {
    createApplication(applicationViewModel: ApplicationViewModel, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<object, any>>;
    createApplications(applicationViewModel: Array<ApplicationViewModel>, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<object, any>>;
    deleteApplication(applicationId: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getApplication(applicationId: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ApplicationViewModel, any>>;
    listApplications(apiPaginatedRequest: ApiPaginatedRequest, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ApplicationListViewModel, any>>;
    updateApplication(applicationId: string, applicationViewModel: ApplicationViewModel, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ApplicationViewModel, any>>;
    uploadApplications(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<object[], any>>;
}
