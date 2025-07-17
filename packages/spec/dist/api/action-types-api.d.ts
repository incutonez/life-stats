import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { ActionTypeViewModel } from '../models';
export declare const ActionTypesApiAxiosParamCreator: (configuration?: Configuration) => {
    getActionTypes: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const ActionTypesApiFp: (configuration?: Configuration) => {
    getActionTypes(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ActionTypeViewModel>>>;
};
export declare const ActionTypesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getActionTypes(options?: RawAxiosRequestConfig): AxiosPromise<Array<ActionTypeViewModel>>;
};
export interface ActionTypesApiInterface {
    getActionTypes(options?: RawAxiosRequestConfig): AxiosPromise<Array<ActionTypeViewModel>>;
}
export declare class ActionTypesApi extends BaseAPI implements ActionTypesApiInterface {
    getActionTypes(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ActionTypeViewModel[], any>>;
}
