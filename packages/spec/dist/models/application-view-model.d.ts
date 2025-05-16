import { CommentViewModel } from './comment-view-model';
import { CompanyViewModel } from './company-view-model';
import { EnumApplicationStatus } from './enum-application-status';
export interface ApplicationViewModel {
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'status': EnumApplicationStatus;
    'id': string;
    'positionTitle': string;
    'dateApplied': number;
    'url': string;
    'site': string;
    'compensation': string;
    'company': CompanyViewModel;
    'comments': Array<CommentViewModel>;
}
