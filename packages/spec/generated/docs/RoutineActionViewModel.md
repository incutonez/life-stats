# RoutineActionViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**routine** | [**RoutineViewModel**](RoutineViewModel.md) |  | [optional] [default to undefined]
**actionType** | [**ActionTypeViewModel**](ActionTypeViewModel.md) |  | [default to undefined]
**order** | **number** |  | [default to undefined]
**value** | **string** |  | [default to undefined]

## Example

```typescript
import { RoutineActionViewModel } from './api';

const instance: RoutineActionViewModel = {
    id,
    userId,
    dateCreated,
    dateUpdated,
    routine,
    actionType,
    order,
    value,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
