import type { ActionTypeViewModel } from './action-type-view-model';
import type { ActivityViewModel } from './activity-view-model';
export interface ActivityActionViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'activity'?: ActivityViewModel;
    'actionType': ActionTypeViewModel;
    'order': number;
    'value': string;
}
