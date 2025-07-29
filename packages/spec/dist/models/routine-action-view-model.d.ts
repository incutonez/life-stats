import type { ActionTypeViewModel } from './action-type-view-model';
import type { RoutineViewModel } from './routine-view-model';
export interface RoutineActionViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'routine'?: RoutineViewModel;
    'actionType': ActionTypeViewModel;
    'order': number;
    'value': string;
}
