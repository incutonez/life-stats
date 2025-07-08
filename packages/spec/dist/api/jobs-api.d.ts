import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { AuditListViewModel } from '../models';
export declare const JobsApiAxiosParamCreator: (configuration?: Configuration) => {
    getJobsHistory: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const JobsApiFp: (configuration?: Configuration) => {
    getJobsHistory(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuditListViewModel>>;
};
export declare const JobsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getJobsHistory(options?: RawAxiosRequestConfig): AxiosPromise<AuditListViewModel>;
};
export interface JobsApiInterface {
    getJobsHistory(options?: RawAxiosRequestConfig): AxiosPromise<AuditListViewModel>;
}
export declare class JobsApi extends BaseAPI implements JobsApiInterface {
    getJobsHistory(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AuditListViewModel, any>>;
}
