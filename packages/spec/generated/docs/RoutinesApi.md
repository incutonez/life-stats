# RoutinesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createRoutine**](#createroutine) | **POST** /exercises/routines | |
|[**deleteRoutine**](#deleteroutine) | **DELETE** /exercises/routines/{routineId} | |
|[**getRoutine**](#getroutine) | **GET** /exercises/routines/{routineId} | |
|[**getRoutines**](#getroutines) | **GET** /exercises/routines | |
|[**updateRoutine**](#updateroutine) | **PUT** /exercises/routines/{routineId} | |

# **createRoutine**
> RoutineViewModel createRoutine(routineViewModel)


### Example

```typescript
import {
    RoutinesApi,
    Configuration,
    RoutineViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new RoutinesApi(configuration);

let routineViewModel: RoutineViewModel; //

const { status, data } = await apiInstance.createRoutine(
    routineViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **routineViewModel** | **RoutineViewModel**|  | |


### Return type

**RoutineViewModel**

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

# **deleteRoutine**
> deleteRoutine()


### Example

```typescript
import {
    RoutinesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RoutinesApi(configuration);

let routineId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteRoutine(
    routineId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **routineId** | [**string**] |  | defaults to undefined|


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
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRoutine**
> RoutineViewModel getRoutine()


### Example

```typescript
import {
    RoutinesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RoutinesApi(configuration);

let routineId: string; // (default to undefined)

const { status, data } = await apiInstance.getRoutine(
    routineId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **routineId** | [**string**] |  | defaults to undefined|


### Return type

**RoutineViewModel**

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

# **getRoutines**
> RoutineListViewModel getRoutines()


### Example

```typescript
import {
    RoutinesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RoutinesApi(configuration);

const { status, data } = await apiInstance.getRoutines();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**RoutineListViewModel**

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

# **updateRoutine**
> RoutineViewModel updateRoutine(routineViewModel)


### Example

```typescript
import {
    RoutinesApi,
    Configuration,
    RoutineViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new RoutinesApi(configuration);

let routineId: string; // (default to undefined)
let routineViewModel: RoutineViewModel; //

const { status, data } = await apiInstance.updateRoutine(
    routineId,
    routineViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **routineViewModel** | **RoutineViewModel**|  | |
| **routineId** | [**string**] |  | defaults to undefined|


### Return type

**RoutineViewModel**

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

