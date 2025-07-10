# AuditDiffViewModel


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**action** | [**EnumAuditActionTypes**](EnumAuditActionTypes.md) |  | [default to undefined]
**field** | **string** |  | [default to undefined]
**valueCurrent** | **object** |  | [optional] [default to undefined]
**valuePrevious** | **object** |  | [optional] [default to undefined]

## Example

```typescript
import { AuditDiffViewModel } from './api';

const instance: AuditDiffViewModel = {
    action,
    field,
    valueCurrent,
    valuePrevious,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
