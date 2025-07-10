# ApplicationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createApplication**](#createapplication) | **POST** /jobs/applications | |
|[**createApplications**](#createapplications) | **POST** /jobs/applications/bulk | |
|[**deleteApplication**](#deleteapplication) | **DELETE** /jobs/applications/{applicationId} | |
|[**getApplication**](#getapplication) | **GET** /jobs/applications/{applicationId} | |
|[**listApplications**](#listapplications) | **POST** /jobs/applications/list | |
|[**updateApplication**](#updateapplication) | **PUT** /jobs/applications/{applicationId} | |
|[**uploadApplications**](#uploadapplications) | **POST** /jobs/applications/upload | |

# **createApplication**
> object createApplication(applicationViewModel)


### Example

```typescript
import {
    ApplicationsApi,
    Configuration,
    ApplicationViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let applicationViewModel: ApplicationViewModel; //

const { status, data } = await apiInstance.createApplication(
    applicationViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationViewModel** | **ApplicationViewModel**|  | |


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

# **createApplications**
> object createApplications(applicationViewModel)


### Example

```typescript
import {
    ApplicationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let applicationViewModel: Array<ApplicationViewModel>; //

const { status, data } = await apiInstance.createApplications(
    applicationViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationViewModel** | **Array<ApplicationViewModel>**|  | |


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

# **deleteApplication**
> deleteApplication()


### Example

```typescript
import {
    ApplicationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let applicationId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteApplication(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|


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

# **getApplication**
> ApplicationViewModel getApplication()


### Example

```typescript
import {
    ApplicationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let applicationId: string; // (default to undefined)

const { status, data } = await apiInstance.getApplication(
    applicationId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

**ApplicationViewModel**

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

# **listApplications**
> ApplicationListViewModel listApplications(apiPaginatedRequest)


### Example

```typescript
import {
    ApplicationsApi,
    Configuration,
    ApiPaginatedRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let apiPaginatedRequest: ApiPaginatedRequest; //

const { status, data } = await apiInstance.listApplications(
    apiPaginatedRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiPaginatedRequest** | **ApiPaginatedRequest**|  | |


### Return type

**ApplicationListViewModel**

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

# **updateApplication**
> ApplicationViewModel updateApplication(applicationViewModel)


### Example

```typescript
import {
    ApplicationsApi,
    Configuration,
    ApplicationViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let applicationId: string; // (default to undefined)
let applicationViewModel: ApplicationViewModel; //

const { status, data } = await apiInstance.updateApplication(
    applicationId,
    applicationViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **applicationViewModel** | **ApplicationViewModel**|  | |
| **applicationId** | [**string**] |  | defaults to undefined|


### Return type

**ApplicationViewModel**

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

# **uploadApplications**
> Array<ApplicationViewModel> uploadApplications()


### Example

```typescript
import {
    ApplicationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ApplicationsApi(configuration);

let addHeaders: boolean; // (default to undefined)
let file: File; // (default to undefined)

const { status, data } = await apiInstance.uploadApplications(
    addHeaders,
    file
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **addHeaders** | [**boolean**] |  | defaults to undefined|
| **file** | [**File**] |  | defaults to undefined|


### Return type

**Array<ApplicationViewModel>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

