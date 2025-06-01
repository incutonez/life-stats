import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { ExerciseActivityViewModel } from '../models';
export declare const ActivitiesApiAxiosParamCreator: (configuration?: Configuration) => {
    getActivity: (activityId: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    uploadActivityFromSource: (source: string, file: File, options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const ActivitiesApiFp: (configuration?: Configuration) => {
    getActivity(activityId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExerciseActivityViewModel>>;
    uploadActivityFromSource(source: string, file: File, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ExerciseActivityViewModel>>>;
};
export declare const ActivitiesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    getActivity(activityId: string, options?: any): AxiosPromise<ExerciseActivityViewModel>;
    uploadActivityFromSource(source: string, file: File, options?: any): AxiosPromise<Array<ExerciseActivityViewModel>>;
};
export interface ActivitiesApiInterface {
    getActivity(activityId: string, options?: AxiosRequestConfig): AxiosPromise<ExerciseActivityViewModel>;
    uploadActivityFromSource(source: string, file: File, options?: AxiosRequestConfig): AxiosPromise<Array<ExerciseActivityViewModel>>;
}
export declare class ActivitiesApi extends BaseAPI implements ActivitiesApiInterface {
    getActivity(activityId: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityViewModel, any>>;
    uploadActivityFromSource(source: string, file: File, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityViewModel[], any>>;
}
