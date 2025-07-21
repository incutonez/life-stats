import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import { type RequestArgs, BaseAPI } from '../base';
import type { RoutineViewModel } from '../models';
export declare const RoutinesApiAxiosParamCreator: (configuration?: Configuration) => {
    createRoutine: (routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig) => Promise<RequestArgs>;
};
export declare const RoutinesApiFp: (configuration?: Configuration) => {
    createRoutine(routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RoutineViewModel>>;
};
export declare const RoutinesApiFactory: (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) => {
    createRoutine(routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): AxiosPromise<RoutineViewModel>;
};
export interface RoutinesApiInterface {
    createRoutine(routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): AxiosPromise<RoutineViewModel>;
}
export declare class RoutinesApi extends BaseAPI implements RoutinesApiInterface {
    createRoutine(routineViewModel: RoutineViewModel, options?: RawAxiosRequestConfig): Promise<import("axios").AxiosResponse<RoutineViewModel, any>>;
}
