import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { ActivityListViewModel } from '../models';
import type { ActivityTypeViewModel } from '../models';
import type { ActivityViewModel } from '../models';
import type { StravaTokenViewModel } from '../models';
export declare const ActivitiesApiAxiosParamCreator: (configuration?: Configuration) => {
    createActivity: (activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    deleteActivity: (activityId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getActivity: (activityId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getActivityTypes: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    importStravaActivities: (file: File, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    listActivities: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    syncStravaActivities: (stravaTokenViewModel: StravaTokenViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    updateActivity: (activityId: string, activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    uploadStravaActivities: (activityViewModel: Array<ActivityViewModel>, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const ActivitiesApiFp: (configuration?: Configuration) => {
    createActivity(activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ActivityViewModel>>;
    deleteActivity(activityId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getActivity(activityId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ActivityViewModel>>;
    getActivityTypes(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ActivityTypeViewModel>>>;
    importStravaActivities(file: File, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ActivityViewModel>>>;
    listActivities(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ActivityListViewModel>>;
    syncStravaActivities(stravaTokenViewModel: StravaTokenViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<StravaTokenViewModel>>;
    updateActivity(activityId: string, activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ActivityViewModel>>;
    uploadStravaActivities(activityViewModel: Array<ActivityViewModel>, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>>;
};
export declare const ActivitiesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createActivity(activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig): AxiosPromise<ActivityViewModel>;
    deleteActivity(activityId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getActivity(activityId: string, options?: RawAxiosRequestConfig): AxiosPromise<ActivityViewModel>;
    getActivityTypes(options?: RawAxiosRequestConfig): AxiosPromise<Array<ActivityTypeViewModel>>;
    importStravaActivities(file: File, options?: RawAxiosRequestConfig): AxiosPromise<Array<ActivityViewModel>>;
    listActivities(options?: RawAxiosRequestConfig): AxiosPromise<ActivityListViewModel>;
    syncStravaActivities(stravaTokenViewModel: StravaTokenViewModel, options?: RawAxiosRequestConfig): AxiosPromise<StravaTokenViewModel>;
    updateActivity(activityId: string, activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig): AxiosPromise<ActivityViewModel>;
    uploadStravaActivities(activityViewModel: Array<ActivityViewModel>, options?: RawAxiosRequestConfig): AxiosPromise<object>;
};
export interface ActivitiesApiInterface {
    createActivity(activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig): AxiosPromise<ActivityViewModel>;
    deleteActivity(activityId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getActivity(activityId: string, options?: RawAxiosRequestConfig): AxiosPromise<ActivityViewModel>;
    getActivityTypes(options?: RawAxiosRequestConfig): AxiosPromise<Array<ActivityTypeViewModel>>;
    importStravaActivities(file: File, options?: RawAxiosRequestConfig): AxiosPromise<Array<ActivityViewModel>>;
    listActivities(options?: RawAxiosRequestConfig): AxiosPromise<ActivityListViewModel>;
    syncStravaActivities(stravaTokenViewModel: StravaTokenViewModel, options?: RawAxiosRequestConfig): AxiosPromise<StravaTokenViewModel>;
    updateActivity(activityId: string, activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig): AxiosPromise<ActivityViewModel>;
    uploadStravaActivities(activityViewModel: Array<ActivityViewModel>, options?: RawAxiosRequestConfig): AxiosPromise<object>;
}
export declare class ActivitiesApi extends BaseAPI implements ActivitiesApiInterface {
    createActivity(activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ActivityViewModel, any>>;
    deleteActivity(activityId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getActivity(activityId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ActivityViewModel, any>>;
    getActivityTypes(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ActivityTypeViewModel[], any>>;
    importStravaActivities(file: File, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ActivityViewModel[], any>>;
    listActivities(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ActivityListViewModel, any>>;
    syncStravaActivities(stravaTokenViewModel: StravaTokenViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<StravaTokenViewModel, any>>;
    updateActivity(activityId: string, activityViewModel: ActivityViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<ActivityViewModel, any>>;
    uploadStravaActivities(activityViewModel: Array<ActivityViewModel>, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<object, any>>;
}
