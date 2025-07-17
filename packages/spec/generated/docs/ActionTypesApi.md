# ActionTypesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getActionTypes**](#getactiontypes) | **GET** /action-types | |

# **getActionTypes**
> Array<ActionTypeViewModel> getActionTypes()


### Example

```typescript
import {
    ActionTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ActionTypesApi(configuration);

const { status, data } = await apiInstance.getActionTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<ActionTypeViewModel>**

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

