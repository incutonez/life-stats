import type { EnumApplicationStatus } from './enum-application-status';
import type { EnumLinkType } from './enum-link-type';
export interface ApplicationLinkViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'type': EnumLinkType;
    'status'?: EnumApplicationStatus;
    'positionTitle'?: string;
    'dateApplied'?: number;
}
