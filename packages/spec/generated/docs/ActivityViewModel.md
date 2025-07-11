# ActivityViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**source** | [**EnumActivitySource**](EnumActivitySource.md) |  | [optional] [default to undefined]
**id** | **string** |  | [default to undefined]
**activityType** | [**ActivityTypeViewModel**](ActivityTypeViewModel.md) |  | [default to undefined]
**attributes** | [**Array&lt;ActivityAttributeViewModel&gt;**](ActivityAttributeViewModel.md) |  | [default to undefined]
**title** | **string** |  | [default to undefined]
**weight** | **number** |  | [optional] [default to undefined]
**duration** | **number** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**sourceId** | **string** |  | [optional] [default to undefined]
**dateOccurred** | **number** |  | [default to undefined]
**actions** | [**Array&lt;ActivityActionViewModel&gt;**](ActivityActionViewModel.md) |  | [default to undefined]
**calories** | **number** |  | [optional] [default to undefined]
**weightLost** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { ActivityViewModel } from './api';

const instance: ActivityViewModel = {
    userId,
    dateCreated,
    dateUpdated,
    source,
    id,
    activityType,
    attributes,
    title,
    weight,
    duration,
    description,
    sourceId,
    dateOccurred,
    actions,
    calories,
    weightLost,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
