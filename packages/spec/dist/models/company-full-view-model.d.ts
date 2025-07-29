import type { ApplicationNestedViewModel } from './application-nested-view-model';
export interface CompanyFullViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'name': string;
    'applications': Array<ApplicationNestedViewModel>;
}
