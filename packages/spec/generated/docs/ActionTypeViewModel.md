# ActionTypeViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**name** | **string** |  | [default to undefined]
**activities** | [**Array&lt;ActionNestedViewModel&gt;**](ActionNestedViewModel.md) |  | [optional] [default to undefined]
**routines** | [**Array&lt;ActionNestedViewModel&gt;**](ActionNestedViewModel.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ActionTypeViewModel } from './api';

const instance: ActionTypeViewModel = {
    id,
    userId,
    dateCreated,
    dateUpdated,
    name,
    activities,
    routines,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
