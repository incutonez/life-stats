# ActivityViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**source** | [**EnumActivitySource**](EnumActivitySource.md) |  | [optional] [default to undefined]
**title** | **string** |  | [default to undefined]
**dateOccurred** | **number** |  | [default to undefined]
**activityType** | [**ActivityTypeViewModel**](ActivityTypeViewModel.md) |  | [optional] [default to undefined]
**weight** | **number** |  | [optional] [default to undefined]
**duration** | **number** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**sourceId** | **string** |  | [optional] [default to undefined]
**actions** | [**Array&lt;ActivityActionViewModel&gt;**](ActivityActionViewModel.md) |  | [optional] [default to undefined]
**calories** | **number** |  | [optional] [default to undefined]
**weightLost** | **number** |  | [optional] [default to undefined]
**attributes** | [**Array&lt;ActivityAttributeViewModel&gt;**](ActivityAttributeViewModel.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ActivityViewModel } from './api';

const instance: ActivityViewModel = {
    id,
    userId,
    dateCreated,
    dateUpdated,
    source,
    title,
    dateOccurred,
    activityType,
    weight,
    duration,
    description,
    sourceId,
    actions,
    calories,
    weightLost,
    attributes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
