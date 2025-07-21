# CompanyFullViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**userId** | **string** |  | [optional] [default to undefined]
**dateCreated** | **number** |  | [optional] [default to undefined]
**dateUpdated** | **number** |  | [optional] [default to undefined]
**id** | **string** |  | [optional] [default to '']
**name** | **string** |  | [default to undefined]
**applications** | [**Array&lt;ApplicationNestedViewModel&gt;**](ApplicationNestedViewModel.md) |  | [default to undefined]

## Example

```typescript
import { CompanyFullViewModel } from './api';

const instance: CompanyFullViewModel = {
    userId,
    dateCreated,
    dateUpdated,
    id,
    name,
    applications,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
