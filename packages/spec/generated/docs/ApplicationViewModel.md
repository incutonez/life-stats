# ApplicationViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**status** | [**EnumApplicationStatus**](EnumApplicationStatus.md) |  | [default to undefined]
**locationType** | [**EnumLocationTypes**](EnumLocationTypes.md) |  | [default to undefined]
**id** | **string** |  | [default to undefined]
**site** | **string** |  | [default to undefined]
**positionTitle** | **string** |  | [default to undefined]
**dateApplied** | **number** |  | [default to undefined]
**url** | **string** |  | [default to undefined]
**compensation** | **string** |  | [default to undefined]
**company** | [**CompanyViewModel**](CompanyViewModel.md) |  | [default to undefined]
**comments** | [**Array&lt;CommentViewModel&gt;**](CommentViewModel.md) |  | [default to undefined]
**links** | [**Array&lt;ApplicationLinkViewModel&gt;**](ApplicationLinkViewModel.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ApplicationViewModel } from './api';

const instance: ApplicationViewModel = {
    userId,
    dateCreated,
    dateUpdated,
    status,
    locationType,
    id,
    site,
    positionTitle,
    dateApplied,
    url,
    compensation,
    company,
    comments,
    links,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
