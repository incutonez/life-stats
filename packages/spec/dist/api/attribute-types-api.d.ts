import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { AttributeTypeListViewModel } from '../models';
import type { AttributeTypeViewModel } from '../models';
export declare const AttributeTypesApiAxiosParamCreator: (configuration?: Configuration) => {
    deleteAttributeType: (attributeTypeId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getAttributeType: (attributeTypeId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getAttributeTypes: (feature: number, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    listAttributeTypes: (body: object, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    updateAttributeType: (attributeTypeId: string, attributeTypeViewModel: AttributeTypeViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const AttributeTypesApiFp: (configuration?: Configuration) => {
    deleteAttributeType(attributeTypeId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getAttributeType(attributeTypeId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AttributeTypeViewModel>>;
    getAttributeTypes(feature: number, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AttributeTypeViewModel>>>;
    listAttributeTypes(body: object, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<AttributeTypeListViewModel>>>;
    updateAttributeType(attributeTypeId: string, attributeTypeViewModel: AttributeTypeViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AttributeTypeViewModel>>;
};
export declare const AttributeTypesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    deleteAttributeType(attributeTypeId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getAttributeType(attributeTypeId: string, options?: RawAxiosRequestConfig): AxiosPromise<AttributeTypeViewModel>;
    getAttributeTypes(feature: number, options?: RawAxiosRequestConfig): AxiosPromise<Array<AttributeTypeViewModel>>;
    listAttributeTypes(body: object, options?: RawAxiosRequestConfig): AxiosPromise<Array<AttributeTypeListViewModel>>;
    updateAttributeType(attributeTypeId: string, attributeTypeViewModel: AttributeTypeViewModel, options?: RawAxiosRequestConfig): AxiosPromise<AttributeTypeViewModel>;
};
export interface AttributeTypesApiInterface {
    deleteAttributeType(attributeTypeId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getAttributeType(attributeTypeId: string, options?: RawAxiosRequestConfig): AxiosPromise<AttributeTypeViewModel>;
    getAttributeTypes(feature: number, options?: RawAxiosRequestConfig): AxiosPromise<Array<AttributeTypeViewModel>>;
    listAttributeTypes(body: object, options?: RawAxiosRequestConfig): AxiosPromise<Array<AttributeTypeListViewModel>>;
    updateAttributeType(attributeTypeId: string, attributeTypeViewModel: AttributeTypeViewModel, options?: RawAxiosRequestConfig): AxiosPromise<AttributeTypeViewModel>;
}
export declare class AttributeTypesApi extends BaseAPI implements AttributeTypesApiInterface {
    deleteAttributeType(attributeTypeId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getAttributeType(attributeTypeId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AttributeTypeViewModel, any>>;
    getAttributeTypes(feature: number, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AttributeTypeViewModel[], any>>;
    listAttributeTypes(body: object, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AttributeTypeListViewModel[], any>>;
    updateAttributeType(attributeTypeId: string, attributeTypeViewModel: AttributeTypeViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AttributeTypeViewModel, any>>;
}
