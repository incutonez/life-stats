import type { ActivityActionTypeViewModel } from './activity-action-type-view-model';
import type { ActivityViewModel } from './activity-view-model';
export interface ActivityActionViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'id': string;
    'actionType': ActivityActionTypeViewModel;
    'order': number;
    'value': string;
    'activity'?: ActivityViewModel;
}
