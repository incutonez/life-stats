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
import type { ActivityActionTypeViewModel } from './activity-action-type-view-model';
// May contain unused imports in some cases
// @ts-ignore
import type { ActivityViewModel } from './activity-view-model';

/**
 * 
 * @export
 * @interface ActivityActionViewModel
 */
export interface ActivityActionViewModel {
    /**
     * 
     * @type {string}
     * @memberof ActivityActionViewModel
     */
    'userId'?: string;
    /**
     * 
     * @type {number}
     * @memberof ActivityActionViewModel
     */
    'dateCreated'?: number;
    /**
     * 
     * @type {number}
     * @memberof ActivityActionViewModel
     */
    'dateUpdated'?: number;
    /**
     * 
     * @type {string}
     * @memberof ActivityActionViewModel
     */
    'id': string;
    /**
     * 
     * @type {ActivityActionTypeViewModel}
     * @memberof ActivityActionViewModel
     */
    'actionType': ActivityActionTypeViewModel;
    /**
     * 
     * @type {number}
     * @memberof ActivityActionViewModel
     */
    'order': number;
    /**
     * 
     * @type {string}
     * @memberof ActivityActionViewModel
     */
    'value': string;
    /**
     * 
     * @type {ActivityViewModel}
     * @memberof ActivityActionViewModel
     */
    'activity'?: ActivityViewModel;
}

