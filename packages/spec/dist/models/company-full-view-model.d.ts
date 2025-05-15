import { ApplicationViewModel } from './application-view-model';
export interface CompanyFullViewModel {
    'id': string;
    'name': string;
    'applications': Array<ApplicationViewModel>;
}
