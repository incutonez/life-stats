import { AuditViewModel } from './audit-view-model';
export interface AuditListViewModel {
    'data': Array<AuditViewModel>;
    'total'?: number;
}
