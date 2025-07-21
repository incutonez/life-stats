# RoutinesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createRoutine**](#createroutine) | **POST** /exercises/routines | |

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

