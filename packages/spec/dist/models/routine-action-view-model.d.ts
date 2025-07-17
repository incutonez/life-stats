import type { ActionTypeViewModel } from './action-type-view-model';
import type { RoutineViewModel } from './routine-view-model';
export interface RoutineActionViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'routine'?: RoutineViewModel;
    'id': string;
    'actionType': ActionTypeViewModel;
    'order': number;
    'value': string;
}
