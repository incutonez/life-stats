import type { EnumApplicationStatus } from './enum-application-status';
import type { EnumLinkType } from './enum-link-type';
export interface ApplicationLinkViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'type': EnumLinkType;
    'status'?: EnumApplicationStatus;
    'id': string;
    'positionTitle'?: string;
    'dateApplied'?: number;
}
