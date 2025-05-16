import { CommentViewModel } from './comment-view-model';
import { CompanyViewModel } from './company-view-model';
import { EnumApplicationStatus } from './enum-application-status';
export interface ApplicationViewModel {
    'order': EnumApplicationStatus;
    'id': string;
    'positionTitle': string;
    'dateApplied': number;
    'url': string;
    'site': string;
    'compensation': string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'company': CompanyViewModel;
    'comments': Array<CommentViewModel>;
}
