import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { AuditListViewModel } from '../models';
export declare const ExercisesApiAxiosParamCreator: (configuration?: Configuration) => {
    getExercisesHistory: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const ExercisesApiFp: (configuration?: Configuration) => {
    getExercisesHistory(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuditListViewModel>>;
};
export declare const ExercisesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getExercisesHistory(options?: any): AxiosPromise<AuditListViewModel>;
};
export interface ExercisesApiInterface {
    getExercisesHistory(options?: AxiosRequestConfig): AxiosPromise<AuditListViewModel>;
}
export declare class ExercisesApi extends BaseAPI implements ExercisesApiInterface {
    getExercisesHistory(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<AuditListViewModel, any>>;
}
