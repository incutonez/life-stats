import type { CompanyViewModel } from './company-view-model';
export interface CompanyListViewModel {
    'data': Array<CompanyViewModel>;
    'total'?: number;
}
