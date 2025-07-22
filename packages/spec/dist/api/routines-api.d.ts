import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { RoutineListViewModel } from '../models';
import type { RoutineViewModel } from '../models';
export declare const RoutinesApiAxiosParamCreator: (configuration?: Configuration) => {
    createRoutine: (routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    deleteRoutine: (routineId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getRoutine: (routineId: string, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    getRoutines: (options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
    updateRoutine: (routineId: string, routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const RoutinesApiFp: (configuration?: Configuration) => {
    createRoutine(routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoutineViewModel>>;
    deleteRoutine(routineId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>>;
    getRoutine(routineId: string, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoutineViewModel>>;
    getRoutines(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoutineListViewModel>>;
    updateRoutine(routineId: string, routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoutineViewModel>>;
};
export declare const RoutinesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createRoutine(routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): AxiosPromise<RoutineViewModel>;
    deleteRoutine(routineId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getRoutine(routineId: string, options?: RawAxiosRequestConfig): AxiosPromise<RoutineViewModel>;
    getRoutines(options?: RawAxiosRequestConfig): AxiosPromise<RoutineListViewModel>;
    updateRoutine(routineId: string, routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): AxiosPromise<RoutineViewModel>;
};
export interface RoutinesApiInterface {
    createRoutine(routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): AxiosPromise<RoutineViewModel>;
    deleteRoutine(routineId: string, options?: RawAxiosRequestConfig): AxiosPromise<void>;
    getRoutine(routineId: string, options?: RawAxiosRequestConfig): AxiosPromise<RoutineViewModel>;
    getRoutines(options?: RawAxiosRequestConfig): AxiosPromise<RoutineListViewModel>;
    updateRoutine(routineId: string, routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): AxiosPromise<RoutineViewModel>;
}
export declare class RoutinesApi extends BaseAPI implements RoutinesApiInterface {
    createRoutine(routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<RoutineViewModel, any>>;
    deleteRoutine(routineId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<void, any>>;
    getRoutine(routineId: string, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<RoutineViewModel, any>>;
    getRoutines(options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<RoutineListViewModel, any>>;
    updateRoutine(routineId: string, routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<RoutineViewModel, any>>;
}
