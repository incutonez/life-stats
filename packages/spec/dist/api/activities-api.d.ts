import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { ExerciseActivityCreateViewModel } from '../models';
import { ExerciseActivityListViewModel } from '../models';
import { ExerciseActivityViewModel } from '../models';
export declare const ActivitiesApiAxiosParamCreator: (configuration?: Configuration) => {
    deleteActivity: (activityId: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    getActivity: (activityId: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    importActivities: (source: string, file: File, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    listActivities: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
    uploadActivities: (exerciseActivityCreateViewModel: Array<ExerciseActivityCreateViewModel>, options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const ActivitiesApiFp: (configuration?: Configuration) => {
    deleteActivity(activityId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getActivity(activityId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExerciseActivityViewModel>>;
    importActivities(source: string, file: File, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ExerciseActivityCreateViewModel>>>;
    listActivities(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExerciseActivityListViewModel>>;
    uploadActivities(exerciseActivityCreateViewModel: Array<ExerciseActivityCreateViewModel>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ExerciseActivityViewModel>>>;
};
export declare const ActivitiesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    deleteActivity(activityId: string, options?: any): AxiosPromise<void>;
    getActivity(activityId: string, options?: any): AxiosPromise<ExerciseActivityViewModel>;
    importActivities(source: string, file: File, options?: any): AxiosPromise<Array<ExerciseActivityCreateViewModel>>;
    listActivities(options?: any): AxiosPromise<ExerciseActivityListViewModel>;
    uploadActivities(exerciseActivityCreateViewModel: Array<ExerciseActivityCreateViewModel>, options?: any): AxiosPromise<Array<ExerciseActivityViewModel>>;
};
export interface ActivitiesApiInterface {
    deleteActivity(activityId: string, options?: AxiosRequestConfig): AxiosPromise<void>;
    getActivity(activityId: string, options?: AxiosRequestConfig): AxiosPromise<ExerciseActivityViewModel>;
    importActivities(source: string, file: File, options?: AxiosRequestConfig): AxiosPromise<Array<ExerciseActivityCreateViewModel>>;
    listActivities(options?: AxiosRequestConfig): AxiosPromise<ExerciseActivityListViewModel>;
    uploadActivities(exerciseActivityCreateViewModel: Array<ExerciseActivityCreateViewModel>, options?: AxiosRequestConfig): AxiosPromise<Array<ExerciseActivityViewModel>>;
}
export declare class ActivitiesApi extends BaseAPI implements ActivitiesApiInterface {
    deleteActivity(activityId: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getActivity(activityId: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityViewModel, any>>;
    importActivities(source: string, file: File, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityCreateViewModel[], any>>;
    listActivities(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityListViewModel, any>>;
    uploadActivities(exerciseActivityCreateViewModel: Array<ExerciseActivityCreateViewModel>, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityViewModel[], any>>;
}
