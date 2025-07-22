import type { RoutineViewModel } from './routine-view-model';
export interface RoutineListViewModel {
    'data': Array<RoutineViewModel>;
    'total'?: number;
}
