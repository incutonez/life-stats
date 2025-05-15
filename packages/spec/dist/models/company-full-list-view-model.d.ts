import { CompanyFullViewModel } from './company-full-view-model';
export interface CompanyFullListViewModel {
    'data': Array<CompanyFullViewModel>;
    'total'?: number;
}
