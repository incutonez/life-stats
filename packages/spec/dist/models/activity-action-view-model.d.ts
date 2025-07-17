import type { ActionTypeViewModel } from './action-type-view-model';
import type { ActivityViewModel } from './activity-view-model';
export interface ActivityActionViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'activity'?: ActivityViewModel;
    'id': string;
    'actionType': ActionTypeViewModel;
    'order': number;
    'value': string;
}
