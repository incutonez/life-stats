import type { ActivityActionViewModel } from './activity-action-view-model';
import type { RoutineActionViewModel } from './routine-action-view-model';
export interface ActionTypeViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'id': string;
    'name': string;
    'actions'?: Array<ActivityActionViewModel>;
    'routines'?: Array<RoutineActionViewModel>;
}
