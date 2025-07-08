import type { AuditDiffViewModel } from './audit-diff-view-model';
import type { EnumAuditActionTypes } from './enum-audit-action-types';
import type { EnumFeatures } from './enum-features';
import type { EnumTableNames } from './enum-table-names';
export interface AuditViewModel {
    'entity': EnumTableNames;
    'action': EnumAuditActionTypes;
    'feature': EnumFeatures;
    'id': string;
    'userId': string;
    'entityId': string;
    'diff': Array<AuditDiffViewModel>;
    'dateCreated': number;
}
