# ActivityAttributeViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**unit** | [**EnumUnitTypes**](EnumUnitTypes.md) |  | [optional] [default to undefined]
**unitDisplay** | [**EnumUnitTypes**](EnumUnitTypes.md) |  | [optional] [default to undefined]
**value** | **string** |  | [default to undefined]
**attributeType** | [**AttributeTypeViewModel**](AttributeTypeViewModel.md) |  | [default to undefined]
**valueDisplay** | **string** |  | [optional] [default to undefined]
**activity** | [**ActivityViewModel**](ActivityViewModel.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ActivityAttributeViewModel } from './api';

const instance: ActivityAttributeViewModel = {
    id,
    userId,
    dateCreated,
    dateUpdated,
    unit,
    unitDisplay,
    value,
    attributeType,
    valueDisplay,
    activity,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
