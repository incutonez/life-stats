import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestArgs, BaseAPI } from '../base';
import { UserCreateViewModel } from '../models';
import { UserSettingsViewModel } from '../models';
import { UserViewModel } from '../models';
export declare const UsersApiAxiosParamCreator: (configuration?: Configuration) => {
    createUser: (userCreateViewModel: UserCreateViewModel, options?: AxiosRequestConfig) => Promise<RequestArgs>;
    getUserProfile: (options?: AxiosRequestConfig) => Promise<RequestArgs>;
    updateUserSettings: (userId: string, userSettingsViewModel: UserSettingsViewModel, options?: AxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const UsersApiFp: (configuration?: Configuration) => {
    createUser(userCreateViewModel: UserCreateViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getUserProfile(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserViewModel>>;
    updateUserSettings(userId: string, userSettingsViewModel: UserSettingsViewModel, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserSettingsViewModel>>;
};
export declare const UsersApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createUser(userCreateViewModel: UserCreateViewModel, options?: any): AxiosPromise<void>;
    getUserProfile(options?: any): AxiosPromise<UserViewModel>;
    updateUserSettings(userId: string, userSettingsViewModel: UserSettingsViewModel, options?: any): AxiosPromise<UserSettingsViewModel>;
};
export interface UsersApiInterface {
    createUser(userCreateViewModel: UserCreateViewModel, options?: AxiosRequestConfig): AxiosPromise<void>;
    getUserProfile(options?: AxiosRequestConfig): AxiosPromise<UserViewModel>;
    updateUserSettings(userId: string, userSettingsViewModel: UserSettingsViewModel, options?: AxiosRequestConfig): AxiosPromise<UserSettingsViewModel>;
}
export declare class UsersApi extends BaseAPI implements UsersApiInterface {
    createUser(userCreateViewModel: UserCreateViewModel, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getUserProfile(options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<UserViewModel, any>>;
    updateUserSettings(userId: string, userSettingsViewModel: UserSettingsViewModel, options?: AxiosRequestConfig): Promise<import("axios").AxiosResponse<UserSettingsViewModel, any>>;
}
