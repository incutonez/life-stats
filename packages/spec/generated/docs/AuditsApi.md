# AuditsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**listAudits**](#listaudits) | **POST** /audits/list | |

# **listAudits**
> AuditListViewModel listAudits()


### Example

```typescript
import {
    AuditsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuditsApi(configuration);

const { status, data } = await apiInstance.listAudits();
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
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

