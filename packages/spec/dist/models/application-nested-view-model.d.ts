import { CommentViewModel } from './comment-view-model';
import { EnumApplicationStatus } from './enum-application-status';
export interface ApplicationNestedViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'status': EnumApplicationStatus;
    'positionTitle': string;
    'dateApplied': number;
    'url': string;
    'compensation': string;
    'comments': Array<CommentViewModel>;
    'id': string;
    'site': string;
}
