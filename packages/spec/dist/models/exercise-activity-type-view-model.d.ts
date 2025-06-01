import { ExerciseActivityViewModel } from './exercise-activity-view-model';
export interface ExerciseActivityTypeViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'id': string;
    'name': string;
    'activities'?: Array<ExerciseActivityViewModel>;
}
