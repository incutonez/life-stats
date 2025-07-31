# AttributeTypeViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**feature** | [**EnumFeatures**](EnumFeatures.md) |  | [optional] [default to undefined]
**name** | **string** |  | [default to undefined]
**activityAttributes** | [**Array&lt;ActivityAttributeViewModel&gt;**](ActivityAttributeViewModel.md) |  | [optional] [default to undefined]

## Example

```typescript
import { AttributeTypeViewModel } from './api';

const instance: AttributeTypeViewModel = {
    id,
    userId,
    dateCreated,
    dateUpdated,
    feature,
    name,
    activityAttributes,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
