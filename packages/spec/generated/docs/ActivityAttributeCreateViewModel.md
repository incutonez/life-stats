# ActivityAttributeCreateViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**unit** | [**EnumUnitTypes**](EnumUnitTypes.md) |  | [optional] [default to undefined]
**unitDisplay** | [**EnumUnitTypes**](EnumUnitTypes.md) |  | [optional] [default to undefined]
**value** | **string** |  | [default to undefined]
**valueDisplay** | **string** |  | [optional] [default to undefined]
**activity** | [**ActivityCreateViewModel**](ActivityCreateViewModel.md) |  | [optional] [default to undefined]
**attributeType** | [**AttributeTypeCreateViewModel**](AttributeTypeCreateViewModel.md) |  | [default to undefined]

## Example

```typescript
import { ActivityAttributeCreateViewModel } from './api';

const instance: ActivityAttributeCreateViewModel = {
    userId,
    dateCreated,
    dateUpdated,
    unit,
    unitDisplay,
    value,
    valueDisplay,
    activity,
    attributeType,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
