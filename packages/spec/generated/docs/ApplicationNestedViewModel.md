# ApplicationNestedViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **string** |  | [optional] [default to undefined]
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**status** | [**EnumApplicationStatus**](EnumApplicationStatus.md) |  | [default to undefined]
**locationType** | [**EnumLocationTypes**](EnumLocationTypes.md) |  | [default to undefined]
**positionTitle** | **string** |  | [default to undefined]
**dateApplied** | **number** |  | [default to undefined]
**url** | **string** |  | [default to undefined]
**compensation** | **string** |  | [default to undefined]
**comments** | [**Array&lt;CommentViewModel&gt;**](CommentViewModel.md) |  | [default to undefined]
**links** | [**Array&lt;ApplicationLinkViewModel&gt;**](ApplicationLinkViewModel.md) |  | [optional] [default to undefined]
**site** | **string** |  | [optional] [default to '']

## Example

```typescript
import { ApplicationNestedViewModel } from './api';

const instance: ApplicationNestedViewModel = {
    id,
    userId,
    dateCreated,
    dateUpdated,
    status,
    locationType,
    positionTitle,
    dateApplied,
    url,
    compensation,
    comments,
    links,
    site,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
