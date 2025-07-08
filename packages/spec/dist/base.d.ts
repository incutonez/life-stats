import type { Configuration } from './configuration';
import type { AxiosInstance, RawAxiosRequestConfig } from 'axios';
export declare const BASE_PATH: string;
export declare const COLLECTION_FORMATS: {
    csv: string;
    ssv: string;
    tsv: string;
    pipes: string;
};
export interface RequestArgs {
    url: string;
    options: RawAxiosRequestConfig;
}
export declare class BaseAPI {
    protected basePath: string;
    protected axios: AxiosInstance;
    protected configuration: Configuration | undefined;
    constructor(configuration?: Configuration, basePath?: string, axios?: AxiosInstance);
}
export declare class RequiredError extends Error {
    field: string;
    constructor(field: string, msg?: string);
}
interface ServerMap {
    [key: string]: {
        url: string;
        description: string;
    }[];
}
export declare const operationServerMap: ServerMap;
export {};
