import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { StravaTokenViewModel } from '../models';
export declare const AuthApiAxiosParamCreator: (configuration?: Configuration) => {
    getStravaToken: (stravaTokenViewModel: StravaTokenViewModel, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    syncStravaActivities: (stravaTokenViewModel: StravaTokenViewModel, options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const AuthApiFp: (configuration?: Configuration) => {
    getStravaToken(stravaTokenViewModel: StravaTokenViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<StravaTokenViewModel>>;
    syncStravaActivities(stravaTokenViewModel: StravaTokenViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<StravaTokenViewModel>>;
};
export declare const AuthApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getStravaToken(stravaTokenViewModel: StravaTokenViewModel, options?: any): AxiosPromise<StravaTokenViewModel>;
    syncStravaActivities(stravaTokenViewModel: StravaTokenViewModel, options?: any): AxiosPromise<StravaTokenViewModel>;
};
export interface AuthApiInterface {
    getStravaToken(stravaTokenViewModel: StravaTokenViewModel, options?: AxiosRequestConfig): AxiosPromise<StravaTokenViewModel>;
    syncStravaActivities(stravaTokenViewModel: StravaTokenViewModel, options?: AxiosRequestConfig): AxiosPromise<StravaTokenViewModel>;
}
export declare class AuthApi extends BaseAPI implements AuthApiInterface {
    getStravaToken(stravaTokenViewModel: StravaTokenViewModel, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<StravaTokenViewModel, any>>;
    syncStravaActivities(stravaTokenViewModel: StravaTokenViewModel, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<StravaTokenViewModel, any>>;
}
