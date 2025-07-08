import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { UserCreateViewModel } from '../models';
import type { UserSettingsViewModel } from '../models';
import type { UserViewModel } from '../models';
export declare const UsersApiAxiosParamCreator: (configuration?: Configuration) => {
    createUser: (userCreateViewModel: UserCreateViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getUserProfile: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    updateUserSettings: (userId: string, userSettingsViewModel: UserSettingsViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const UsersApiFp: (configuration?: Configuration) => {
    createUser(userCreateViewModel: UserCreateViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getUserProfile(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserViewModel>>;
    updateUserSettings(userId: string, userSettingsViewModel: UserSettingsViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserSettingsViewModel>>;
};
export declare const UsersApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createUser(userCreateViewModel: UserCreateViewModel, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getUserProfile(options?: RawAxiosRequestConfig): AxiosPromise<UserViewModel>;
    updateUserSettings(userId: string, userSettingsViewModel: UserSettingsViewModel, options?: RawAxiosRequestConfig): AxiosPromise<UserSettingsViewModel>;
};
export interface UsersApiInterface {
    createUser(userCreateViewModel: UserCreateViewModel, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getUserProfile(options?: RawAxiosRequestConfig): AxiosPromise<UserViewModel>;
    updateUserSettings(userId: string, userSettingsViewModel: UserSettingsViewModel, options?: RawAxiosRequestConfig): AxiosPromise<UserSettingsViewModel>;
}
export declare class UsersApi extends BaseAPI implements UsersApiInterface {
    createUser(userCreateViewModel: UserCreateViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getUserProfile(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserViewModel, any>>;
    updateUserSettings(userId: string, userSettingsViewModel: UserSettingsViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<UserSettingsViewModel, any>>;
}
