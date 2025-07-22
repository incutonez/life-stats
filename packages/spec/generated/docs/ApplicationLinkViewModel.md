# ApplicationLinkViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**type** | [**EnumLinkType**](EnumLinkType.md) |  | [default to undefined]
**status** | [**EnumApplicationStatus**](EnumApplicationStatus.md) |  | [optional] [default to undefined]
**id** | **string** |  | [default to '']
**positionTitle** | **string** |  | [optional] [default to undefined]
**dateApplied** | **number** |  | [optional] [default to undefined]

## Example

```typescript
import { ApplicationLinkViewModel } from './api';

const instance: ApplicationLinkViewModel = {
    userId,
    dateCreated,
    dateUpdated,
    type,
    status,
    id,
    positionTitle,
    dateApplied,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
