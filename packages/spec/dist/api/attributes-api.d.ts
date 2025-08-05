import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
export declare const AttributesApiAxiosParamCreator: (configuration?: Configuration) => {
    deleteAttribute: (attributeId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const AttributesApiFp: (configuration?: Configuration) => {
    deleteAttribute(attributeId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
};
export declare const AttributesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    deleteAttribute(attributeId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
};
export interface AttributesApiInterface {
    deleteAttribute(attributeId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
}
export declare class AttributesApi extends BaseAPI implements AttributesApiInterface {
    deleteAttribute(attributeId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
}
