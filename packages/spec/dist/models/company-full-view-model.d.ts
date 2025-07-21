import type { ApplicationNestedViewModel } from './application-nested-view-model';
export interface CompanyFullViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'id'?: string;
    'name': string;
    'applications': Array<ApplicationNestedViewModel>;
}
