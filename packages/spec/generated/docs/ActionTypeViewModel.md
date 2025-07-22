# ActionTypeViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**id** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**actions** | [**Array&lt;ActionNestedViewModel&gt;**](ActionNestedViewModel.md) |  | [optional] [default to undefined]
**routines** | [**Array&lt;ActionNestedViewModel&gt;**](ActionNestedViewModel.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ActionTypeViewModel } from './api';

const instance: ActionTypeViewModel = {
    userId,
    dateCreated,
    dateUpdated,
    id,
    name,
    actions,
    routines,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
