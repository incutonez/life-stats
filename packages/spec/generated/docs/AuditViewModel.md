# AuditViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**entity** | [**EnumTableNames**](EnumTableNames.md) |  | [default to undefined]
**action** | [**EnumAuditActionTypes**](EnumAuditActionTypes.md) |  | [default to undefined]
**feature** | [**EnumFeatures**](EnumFeatures.md) |  | [default to undefined]
**id** | **string** |  | [default to undefined]
**userId** | **string** |  | [default to undefined]
**entityId** | **string** |  | [default to undefined]
**diff** | [**Array&lt;AuditDiffViewModel&gt;**](AuditDiffViewModel.md) |  | [default to undefined]
**dateCreated** | **number** |  | [default to undefined]

## Example

```typescript
import { AuditViewModel } from './api';

const instance: AuditViewModel = {
    entity,
    action,
    feature,
    id,
    userId,
    entityId,
    diff,
    dateCreated,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
