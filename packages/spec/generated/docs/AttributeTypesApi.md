# AttributeTypesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**deleteAttributeType**](#deleteattributetype) | **DELETE** /attribute-types/{attributeTypeId} | |
|[**getAttributeType**](#getattributetype) | **GET** /attribute-types/{attributeTypeId} | |
|[**getAttributeTypes**](#getattributetypes) | **GET** /attribute-types | |
|[**listAttributeTypes**](#listattributetypes) | **POST** /attribute-types/list | |
|[**updateAttributeType**](#updateattributetype) | **PUT** /attribute-types/{attributeTypeId} | |

# **deleteAttributeType**
> deleteAttributeType()


### Example

```typescript
import {
    AttributeTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttributeTypesApi(configuration);

let attributeTypeId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteAttributeType(
    attributeTypeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **attributeTypeId** | [**string**] |  | defaults to undefined|


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

# **getAttributeType**
> AttributeTypeViewModel getAttributeType()


### Example

```typescript
import {
    AttributeTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttributeTypesApi(configuration);

let attributeTypeId: string; // (default to undefined)

const { status, data } = await apiInstance.getAttributeType(
    attributeTypeId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **attributeTypeId** | [**string**] |  | defaults to undefined|


### Return type

**AttributeTypeViewModel**

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

let feature: number; // (default to undefined)

const { status, data } = await apiInstance.getAttributeTypes(
    feature
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **feature** | [**number**] |  | defaults to undefined|


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

# **listAttributeTypes**
> Array<AttributeTypeListViewModel> listAttributeTypes(body)


### Example

```typescript
import {
    AttributeTypesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AttributeTypesApi(configuration);

let body: object; //

const { status, data } = await apiInstance.listAttributeTypes(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **object**|  | |


### Return type

**Array<AttributeTypeListViewModel>**

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

# **updateAttributeType**
> AttributeTypeViewModel updateAttributeType(attributeTypeViewModel)


### Example

```typescript
import {
    AttributeTypesApi,
    Configuration,
    AttributeTypeViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new AttributeTypesApi(configuration);

let attributeTypeId: string; // (default to undefined)
let attributeTypeViewModel: AttributeTypeViewModel; //

const { status, data } = await apiInstance.updateAttributeType(
    attributeTypeId,
    attributeTypeViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **attributeTypeViewModel** | **AttributeTypeViewModel**|  | |
| **attributeTypeId** | [**string**] |  | defaults to undefined|


### Return type

**AttributeTypeViewModel**

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

