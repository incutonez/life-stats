import type { RoutineActionViewModel } from './routine-action-view-model';
export interface RoutineViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'id': string;
    'name': string;
    'actions': Array<RoutineActionViewModel>;
}
