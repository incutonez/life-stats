import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { AuditListViewModel } from '../models';
export declare const AuditsApiAxiosParamCreator: (configuration?: Configuration) => {
    listAudits: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const AuditsApiFp: (configuration?: Configuration) => {
    listAudits(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuditListViewModel>>;
};
export declare const AuditsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    listAudits(options?: any): AxiosPromise<AuditListViewModel>;
};
export interface AuditsApiInterface {
    listAudits(options?: AxiosRequestConfig): AxiosPromise<AuditListViewModel>;
}
export declare class AuditsApi extends BaseAPI implements AuditsApiInterface {
    listAudits(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<AuditListViewModel, any>>;
}
