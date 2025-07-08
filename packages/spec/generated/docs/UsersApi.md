# UsersApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createUser**](#createuser) | **POST** /users | |
|[**getUserProfile**](#getuserprofile) | **POST** /users/profile | |
|[**updateUserSettings**](#updateusersettings) | **PUT** /users/{userId}/settings | |

# **createUser**
> createUser(userCreateViewModel)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    UserCreateViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userCreateViewModel: UserCreateViewModel; //

const { status, data } = await apiInstance.createUser(
    userCreateViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userCreateViewModel** | **UserCreateViewModel**|  | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUserProfile**
> UserViewModel getUserProfile()


### Example

```typescript
import {
    UsersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

const { status, data } = await apiInstance.getUserProfile();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**UserViewModel**

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

# **updateUserSettings**
> UserSettingsViewModel updateUserSettings(userSettingsViewModel)


### Example

```typescript
import {
    UsersApi,
    Configuration,
    UserSettingsViewModel
} from './api';

const configuration = new Configuration();
const apiInstance = new UsersApi(configuration);

let userId: string; // (default to undefined)
let userSettingsViewModel: UserSettingsViewModel; //

const { status, data } = await apiInstance.updateUserSettings(
    userId,
    userSettingsViewModel
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userSettingsViewModel** | **UserSettingsViewModel**|  | |
| **userId** | [**string**] |  | defaults to undefined|


### Return type

**UserSettingsViewModel**

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

