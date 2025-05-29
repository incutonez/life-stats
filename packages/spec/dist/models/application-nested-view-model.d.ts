import { CommentViewModel } from './comment-view-model';
import { EnumApplicationStatus } from './enum-application-status';
export interface ApplicationNestedViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'status': EnumApplicationStatus;
    'id': string;
    'positionTitle': string;
    'dateApplied': number;
    'url': string;
    'site': string;
    'compensation': string;
    'comments': Array<CommentViewModel>;
}
