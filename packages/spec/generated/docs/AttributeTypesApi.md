# AttributeTypesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getAttributeTypes**](#getattributetypes) | **GET** /attribute-types | |

# **getAttributeTypes**
> Array<AttributeTypeViewModel> getAttributeTypes()


### Example

```typescript
import {
    AttributeTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttributeTypesApi(configuration);

const { status, data } = await apiInstance.getAttributeTypes();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<AttributeTypeViewModel>**

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

