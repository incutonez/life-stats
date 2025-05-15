import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { AppInfoViewModel } from '../models';
export declare const AppApiAxiosParamCreator: (configuration?: Configuration) => {
    getInfo: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const AppApiFp: (configuration?: Configuration) => {
    getInfo(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AppInfoViewModel>>;
};
export declare const AppApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getInfo(options?: any): AxiosPromise<AppInfoViewModel>;
};
export interface AppApiInterface {
    getInfo(options?: AxiosRequestConfig): AxiosPromise<AppInfoViewModel>;
}
export declare class AppApi extends BaseAPI implements AppApiInterface {
    getInfo(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<AppInfoViewModel, any>>;
}
