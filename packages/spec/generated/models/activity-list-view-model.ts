/* tslint:disable */
/* eslint-disable */
/**
 * API
 * The main API for the UI
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import type { ActivityViewModel } from './activity-view-model';

/**
 * 
 * @export
 * @interface ActivityListViewModel
 */
export interface ActivityListViewModel {
    /**
     * 
     * @type {Array<ActivityViewModel>}
     * @memberof ActivityListViewModel
     */
    'data': Array<ActivityViewModel>;
    /**
     * 
     * @type {number}
     * @memberof ActivityListViewModel
     */
    'total'?: number;
}

