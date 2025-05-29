import { AuditDiffViewModel } from './audit-diff-view-model';
import { EnumAuditActionTypes } from './enum-audit-action-types';
export interface AuditViewModel {
    'action': EnumAuditActionTypes;
    'id': string;
    'userId': string;
    'entity': string;
    'diff': Array<AuditDiffViewModel>;
    'dateCreated': number;
}
