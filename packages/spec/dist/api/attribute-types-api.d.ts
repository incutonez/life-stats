import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { AttributeTypeViewModel } from '../models';
export declare const AttributeTypesApiAxiosParamCreator: (configuration?: Configuration) => {
    getAttributeTypes: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const AttributeTypesApiFp: (configuration?: Configuration) => {
    getAttributeTypes(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AttributeTypeViewModel>>>;
};
export declare const AttributeTypesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getAttributeTypes(options?: RawAxiosRequestConfig): AxiosPromise<Array<AttributeTypeViewModel>>;
};
export interface AttributeTypesApiInterface {
    getAttributeTypes(options?: RawAxiosRequestConfig): AxiosPromise<Array<AttributeTypeViewModel>>;
}
export declare class AttributeTypesApi extends BaseAPI implements AttributeTypesApiInterface {
    getAttributeTypes(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AttributeTypeViewModel[], any>>;
}
