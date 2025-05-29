import { EnumAuditActionTypes } from './enum-audit-action-types';
export interface AuditDiffViewModel {
    'action': EnumAuditActionTypes;
    'field': string;
    'valueCurrent'?: object;
    'valuePrevious'?: object;
}
