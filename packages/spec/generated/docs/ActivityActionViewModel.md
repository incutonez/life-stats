# ActivityActionViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**id** | **string** |  | [default to undefined]
**actionType** | [**ActivityActionTypeViewModel**](ActivityActionTypeViewModel.md) |  | [default to undefined]
**order** | **number** |  | [default to undefined]
**value** | **string** |  | [default to undefined]
**activity** | [**ActivityViewModel**](ActivityViewModel.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ActivityActionViewModel } from './api';

const instance: ActivityActionViewModel = {
    userId,
    dateCreated,
    dateUpdated,
    id,
    actionType,
    order,
    value,
    activity,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
