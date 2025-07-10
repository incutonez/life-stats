import type { ActivityActionViewModel } from './activity-action-view-model';
export interface ActivityActionTypeViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'id': string;
    'name': string;
    'actions'?: Array<ActivityActionViewModel>;
}
