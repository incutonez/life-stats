import { ExerciseActivityViewModel } from './exercise-activity-view-model';
export interface ExerciseActivityListViewModel {
    'data': Array<ExerciseActivityViewModel>;
    'total'?: number;
}
