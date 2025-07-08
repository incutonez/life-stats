import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { AuditListViewModel } from '../models';
export declare const ExercisesApiAxiosParamCreator: (configuration?: Configuration) => {
    getExercisesHistory: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const ExercisesApiFp: (configuration?: Configuration) => {
    getExercisesHistory(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuditListViewModel>>;
};
export declare const ExercisesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getExercisesHistory(options?: RawAxiosRequestConfig): AxiosPromise<AuditListViewModel>;
};
export interface ExercisesApiInterface {
    getExercisesHistory(options?: RawAxiosRequestConfig): AxiosPromise<AuditListViewModel>;
}
export declare class ExercisesApi extends BaseAPI implements ExercisesApiInterface {
    getExercisesHistory(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<AuditListViewModel, any>>;
}
