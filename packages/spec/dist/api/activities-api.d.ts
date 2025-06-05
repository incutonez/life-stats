import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { ExerciseActivityCreateViewModel } from '../models';
import { ExerciseActivityListViewModel } from '../models';
import { ExerciseActivityViewModel } from '../models';
export declare const ActivitiesApiAxiosParamCreator: (configuration?: Configuration) => {
    createActivity: (exerciseActivityCreateViewModel: ExerciseActivityCreateViewModel, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    deleteActivity: (activityId: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    getActivity: (activityId: string, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    importActivities: (source: string, file: File, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    listActivities: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
    updateActivity: (activityId: string, exerciseActivityViewModel: ExerciseActivityViewModel, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    uploadActivities: (requestBody: Array<string>, options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const ActivitiesApiFp: (configuration?: Configuration) => {
    createActivity(exerciseActivityCreateViewModel: ExerciseActivityCreateViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExerciseActivityViewModel>>;
    deleteActivity(activityId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getActivity(activityId: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExerciseActivityViewModel>>;
    importActivities(source: string, file: File, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ExerciseActivityCreateViewModel>>>;
    listActivities(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExerciseActivityListViewModel>>;
    updateActivity(activityId: string, exerciseActivityViewModel: ExerciseActivityViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExerciseActivityViewModel>>;
    uploadActivities(requestBody: Array<string>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>>;
};
export declare const ActivitiesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createActivity(exerciseActivityCreateViewModel: ExerciseActivityCreateViewModel, options?: any): AxiosPromise<ExerciseActivityViewModel>;
    deleteActivity(activityId: string, options?: any): AxiosPromise<void>;
    getActivity(activityId: string, options?: any): AxiosPromise<ExerciseActivityViewModel>;
    importActivities(source: string, file: File, options?: any): AxiosPromise<Array<ExerciseActivityCreateViewModel>>;
    listActivities(options?: any): AxiosPromise<ExerciseActivityListViewModel>;
    updateActivity(activityId: string, exerciseActivityViewModel: ExerciseActivityViewModel, options?: any): AxiosPromise<ExerciseActivityViewModel>;
    uploadActivities(requestBody: Array<string>, options?: any): AxiosPromise<object>;
};
export interface ActivitiesApiInterface {
    createActivity(exerciseActivityCreateViewModel: ExerciseActivityCreateViewModel, options?: AxiosRequestConfig): AxiosPromise<ExerciseActivityViewModel>;
    deleteActivity(activityId: string, options?: AxiosRequestConfig): AxiosPromise<void>;
    getActivity(activityId: string, options?: AxiosRequestConfig): AxiosPromise<ExerciseActivityViewModel>;
    importActivities(source: string, file: File, options?: AxiosRequestConfig): AxiosPromise<Array<ExerciseActivityCreateViewModel>>;
    listActivities(options?: AxiosRequestConfig): AxiosPromise<ExerciseActivityListViewModel>;
    updateActivity(activityId: string, exerciseActivityViewModel: ExerciseActivityViewModel, options?: AxiosRequestConfig): AxiosPromise<ExerciseActivityViewModel>;
    uploadActivities(requestBody: Array<string>, options?: AxiosRequestConfig): AxiosPromise<object>;
}
export declare class ActivitiesApi extends BaseAPI implements ActivitiesApiInterface {
    createActivity(exerciseActivityCreateViewModel: ExerciseActivityCreateViewModel, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityViewModel, any>>;
    deleteActivity(activityId: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getActivity(activityId: string, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityViewModel, any>>;
    importActivities(source: string, file: File, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityCreateViewModel[], any>>;
    listActivities(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityListViewModel, any>>;
    updateActivity(activityId: string, exerciseActivityViewModel: ExerciseActivityViewModel, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<ExerciseActivityViewModel, any>>;
    uploadActivities(requestBody: Array<string>, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<object, any>>;
}
