import type { RoutineActionViewModel } from './routine-action-view-model';
export interface RoutineViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'name': string;
    'actions': Array<RoutineActionViewModel>;
}
