import { ApplicationViewModel } from './application-view-model';
export interface ApplicationListViewModel {
    'data': Array<ApplicationViewModel>;
    'total'?: number;
}
