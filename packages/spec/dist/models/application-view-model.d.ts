import { CommentViewModel } from './comment-view-model';
import { CompanyViewModel } from './company-view-model';
import { EnumApplicationStatus } from './enum-application-status';
export interface ApplicationViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'status': EnumApplicationStatus;
    'id': string;
    'site': string;
    'positionTitle': string;
    'dateApplied': number;
    'url': string;
    'compensation': string;
    'company': CompanyViewModel;
    'comments': Array<CommentViewModel>;
}
