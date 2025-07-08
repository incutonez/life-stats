import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { AuditListViewModel } from '../models';
export declare const AuditsApiAxiosParamCreator: (configuration?: Configuration) => {
    listAudits: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const AuditsApiFp: (configuration?: Configuration) => {
    listAudits(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuditListViewModel>>;
};
export declare const AuditsApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    listAudits(options?: RawAxiosRequestConfig): AxiosPromise<AuditListViewModel>;
};
export interface AuditsApiInterface {
    listAudits(options?: RawAxiosRequestConfig): AxiosPromise<AuditListViewModel>;
}
export declare class AuditsApi extends BaseAPI implements AuditsApiInterface {
    listAudits(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AuditListViewModel, any>>;
}
