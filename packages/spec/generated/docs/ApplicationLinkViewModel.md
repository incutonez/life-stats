# ApplicationLinkViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**type** | [**EnumLinkType**](EnumLinkType.md) |  | [default to undefined]
**status** | [**EnumApplicationStatus**](EnumApplicationStatus.md) |  | [optional] [default to undefined]
**positionTitle** | **string** |  | [optional] [default to undefined]
**dateApplied** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { ApplicationLinkViewModel } from './api';

const instance: ApplicationLinkViewModel = {
    id,
    userId,
    dateCreated,
    dateUpdated,
    type,
    status,
    positionTitle,
    dateApplied,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
