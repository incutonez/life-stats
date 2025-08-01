# ActivitiesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createActivity**](#createactivity) | **POST** /exercises/activities | |
|[**deleteActivity**](#deleteactivity) | **DELETE** /exercises/activities/{activityId} | |
|[**getActivity**](#getactivity) | **GET** /exercises/activities/{activityId} | |
|[**getActivityTypes**](#getactivitytypes) | **GET** /exercises/activities/activity-types | |
|[**importStravaActivities**](#importstravaactivities) | **POST** /exercises/activities/strava/import | |
|[**listActivities**](#listactivities) | **POST** /exercises/activities/list | |
|[**syncStravaActivities**](#syncstravaactivities) | **POST** /exercises/activities/strava/sync | |
|[**updateActivity**](#updateactivity) | **PUT** /exercises/activities/{activityId} | |
|[**uploadStravaActivities**](#uploadstravaactivities) | **POST** /exercises/activities/strava/upload | |

# **createActivity**
> ActivityViewModel createActivity(activityViewModel)


### Example

```typescript
import {
    ActivitiesApi,
    Configuration,
    ActivityViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let activityViewModel: ActivityViewModel; //

const { status, data } = await apiInstance.createActivity(
    activityViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **activityViewModel** | **ActivityViewModel**|  | |


### Return type

**ActivityViewModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteActivity**
> deleteActivity()


### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let activityId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteActivity(
    activityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **activityId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getActivity**
> ActivityViewModel getActivity()


### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let activityId: string; // (default to undefined)

const { status, data } = await apiInstance.getActivity(
    activityId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **activityId** | [**string**] |  | defaults to undefined|


### Return type

**ActivityViewModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getActivityTypes**
> Array<ActivityTypeViewModel> getActivityTypes()


### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

const { status, data } = await apiInstance.getActivityTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ActivityTypeViewModel>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **importStravaActivities**
> Array<ActivityViewModel> importStravaActivities()


### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let file: File; // (default to undefined)
let addHeaders: boolean; // (optional) (default to undefined)

const { status, data } = await apiInstance.importStravaActivities(
    file,
    addHeaders
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **file** | [**File**] |  | defaults to undefined|
| **addHeaders** | [**boolean**] |  | (optional) defaults to undefined|


### Return type

**Array<ActivityViewModel>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listActivities**
> ActivityListViewModel listActivities()


### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

const { status, data } = await apiInstance.listActivities();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ActivityListViewModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **syncStravaActivities**
> StravaTokenViewModel syncStravaActivities(stravaTokenViewModel)


### Example

```typescript
import {
    ActivitiesApi,
    Configuration,
    StravaTokenViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let stravaTokenViewModel: StravaTokenViewModel; //

const { status, data } = await apiInstance.syncStravaActivities(
    stravaTokenViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **stravaTokenViewModel** | **StravaTokenViewModel**|  | |


### Return type

**StravaTokenViewModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateActivity**
> ActivityViewModel updateActivity(activityViewModel)


### Example

```typescript
import {
    ActivitiesApi,
    Configuration,
    ActivityViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let activityId: string; // (default to undefined)
let activityViewModel: ActivityViewModel; //

const { status, data } = await apiInstance.updateActivity(
    activityId,
    activityViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **activityViewModel** | **ActivityViewModel**|  | |
| **activityId** | [**string**] |  | defaults to undefined|


### Return type

**ActivityViewModel**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **uploadStravaActivities**
> object uploadStravaActivities(activityViewModel)


### Example

```typescript
import {
    ActivitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActivitiesApi(configuration);

let activityViewModel: Array<ActivityViewModel>; //

const { status, data } = await apiInstance.uploadStravaActivities(
    activityViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **activityViewModel** | **Array<ActivityViewModel>**|  | |


### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

