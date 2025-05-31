import { AuditDiffViewModel } from './audit-diff-view-model';
import { EnumAuditActionTypes } from './enum-audit-action-types';
import { EnumTableNames } from './enum-table-names';
export interface AuditViewModel {
    'entity': EnumTableNames;
    'action': EnumAuditActionTypes;
    'id': string;
    'userId': string;
    'entityId': string;
    'diff': Array<AuditDiffViewModel>;
    'dateCreated': number;
}
