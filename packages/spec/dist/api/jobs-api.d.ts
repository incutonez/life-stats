import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { AuditListViewModel } from '../models';
export declare const JobsApiAxiosParamCreator: (configuration?: Configuration) => {
    getJobsHistory: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const JobsApiFp: (configuration?: Configuration) => {
    getJobsHistory(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuditListViewModel>>;
};
export declare const JobsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getJobsHistory(options?: any): AxiosPromise<AuditListViewModel>;
};
export interface JobsApiInterface {
    getJobsHistory(options?: AxiosRequestConfig): AxiosPromise<AuditListViewModel>;
}
export declare class JobsApi extends BaseAPI implements JobsApiInterface {
    getJobsHistory(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<AuditListViewModel, any>>;
}
