import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { ApiPaginatedRequest } from '../models';
import type { ApplicationListViewModel } from '../models';
import type { ApplicationViewModel } from '../models';
export declare const ApplicationsApiAxiosParamCreator: (configuration?: Configuration) => {
    createApplication: (applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    createApplications: (applicationViewModel: Array<ApplicationViewModel>, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    deleteApplication: (applicationId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getApplication: (applicationId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    listApplications: (apiPaginatedRequest: ApiPaginatedRequest, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    updateApplication: (applicationId: string, applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    uploadApplications: (addHeaders: boolean, file: File, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const ApplicationsApiFp: (configuration?: Configuration) => {
    createApplication(applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>>;
    createApplications(applicationViewModel: Array<ApplicationViewModel>, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>>;
    deleteApplication(applicationId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getApplication(applicationId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplicationViewModel>>;
    listApplications(apiPaginatedRequest: ApiPaginatedRequest, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplicationListViewModel>>;
    updateApplication(applicationId: string, applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ApplicationViewModel>>;
    uploadApplications(addHeaders: boolean, file: File, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ApplicationViewModel>>>;
};
export declare const ApplicationsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createApplication(applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig): AxiosPromise<object>;
    createApplications(applicationViewModel: Array<ApplicationViewModel>, options?: RawAxiosRequestConfig): AxiosPromise<object>;
    deleteApplication(applicationId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getApplication(applicationId: string, options?: RawAxiosRequestConfig): AxiosPromise<ApplicationViewModel>;
    listApplications(apiPaginatedRequest: ApiPaginatedRequest, options?: RawAxiosRequestConfig): AxiosPromise<ApplicationListViewModel>;
    updateApplication(applicationId: string, applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig): AxiosPromise<ApplicationViewModel>;
    uploadApplications(addHeaders: boolean, file: File, options?: RawAxiosRequestConfig): AxiosPromise<Array<ApplicationViewModel>>;
};
export interface ApplicationsApiInterface {
    createApplication(applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig): AxiosPromise<object>;
    createApplications(applicationViewModel: Array<ApplicationViewModel>, options?: RawAxiosRequestConfig): AxiosPromise<object>;
    deleteApplication(applicationId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getApplication(applicationId: string, options?: RawAxiosRequestConfig): AxiosPromise<ApplicationViewModel>;
    listApplications(apiPaginatedRequest: ApiPaginatedRequest, options?: RawAxiosRequestConfig): AxiosPromise<ApplicationListViewModel>;
    updateApplication(applicationId: string, applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig): AxiosPromise<ApplicationViewModel>;
    uploadApplications(addHeaders: boolean, file: File, options?: RawAxiosRequestConfig): AxiosPromise<Array<ApplicationViewModel>>;
}
export declare class ApplicationsApi extends BaseAPI implements ApplicationsApiInterface {
    createApplication(applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<object, any>>;
    createApplications(applicationViewModel: Array<ApplicationViewModel>, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<object, any>>;
    deleteApplication(applicationId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getApplication(applicationId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ApplicationViewModel, any>>;
    listApplications(apiPaginatedRequest: ApiPaginatedRequest, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ApplicationListViewModel, any>>;
    updateApplication(applicationId: string, applicationViewModel: ApplicationViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ApplicationViewModel, any>>;
    uploadApplications(addHeaders: boolean, file: File, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ApplicationViewModel[], any>>;
}
