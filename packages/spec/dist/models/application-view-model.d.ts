import type { ApplicationLinkViewModel } from './application-link-view-model';
import type { CommentViewModel } from './comment-view-model';
import type { CompanyViewModel } from './company-view-model';
import type { EnumApplicationStatus } from './enum-application-status';
import type { EnumLocationTypes } from './enum-location-types';
export interface ApplicationViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'status': EnumApplicationStatus;
    'locationType': EnumLocationTypes;
    'positionTitle': string;
    'dateApplied': number;
    'url': string;
    'compensation': string;
    'company': CompanyViewModel;
    'comments': Array<CommentViewModel>;
    'links'?: Array<ApplicationLinkViewModel>;
    'site'?: string;
}
