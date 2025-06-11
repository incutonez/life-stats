import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { AttributeTypeViewModel } from '../models';
export declare const AttributeTypesApiAxiosParamCreator: (configuration?: Configuration) => {
    getAttributeTypes: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const AttributeTypesApiFp: (configuration?: Configuration) => {
    getAttributeTypes(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AttributeTypeViewModel>>>;
};
export declare const AttributeTypesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getAttributeTypes(options?: any): AxiosPromise<Array<AttributeTypeViewModel>>;
};
export interface AttributeTypesApiInterface {
    getAttributeTypes(options?: AxiosRequestConfig): AxiosPromise<Array<AttributeTypeViewModel>>;
}
export declare class AttributeTypesApi extends BaseAPI implements AttributeTypesApiInterface {
    getAttributeTypes(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<AttributeTypeViewModel[], any>>;
}
