# AttributesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteAttribute**](#deleteattribute) | **DELETE** /attributes/{attributeId} | |

# **deleteAttribute**
> deleteAttribute()


### Example

```typescript
import {
    AttributesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttributesApi(configuration);

let attributeId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteAttribute(
    attributeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **attributeId** | [**string**] |  | defaults to undefined|


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

