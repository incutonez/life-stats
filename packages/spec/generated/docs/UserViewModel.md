# UserViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**firstName** | **string** |  | [default to undefined]
**lastName** | **string** |  | [optional] [default to undefined]
**email** | **string** |  | [default to undefined]
**nickname** | **string** |  | [optional] [default to undefined]
**lastAccessed** | **number** |  | [default to undefined]
**settings** | [**UserSettingsViewModel**](UserSettingsViewModel.md) |  | [default to undefined]

## Example

```typescript
import { UserViewModel } from './api';

const instance: UserViewModel = {
    id,
    userId,
    dateCreated,
    dateUpdated,
    firstName,
    lastName,
    email,
    nickname,
    lastAccessed,
    settings,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
