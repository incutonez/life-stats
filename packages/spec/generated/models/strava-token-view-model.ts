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



/**
 * 
 * @export
 * @interface StravaTokenViewModel
 */
export interface StravaTokenViewModel {
    /**
     * 
     * @type {string}
     * @memberof StravaTokenViewModel
     */
    'accessToken': string;
    /**
     * 
     * @type {string}
     * @memberof StravaTokenViewModel
     */
    'refreshToken'?: string;
    /**
     * 
     * @type {number}
     * @memberof StravaTokenViewModel
     */
    'expirationDate'?: number;
}

