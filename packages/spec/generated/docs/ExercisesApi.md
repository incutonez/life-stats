# ExercisesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getExercisesHistory**](#getexerciseshistory) | **GET** /exercises/history | |

# **getExercisesHistory**
> AuditListViewModel getExercisesHistory()


### Example

```typescript
import {
    ExercisesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ExercisesApi(configuration);

const { status, data } = await apiInstance.getExercisesHistory();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AuditListViewModel**

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

