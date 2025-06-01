import { EnumActivitySource } from './enum-activity-source';
import { ExerciseActivityAttributeViewModel } from './exercise-activity-attribute-view-model';
import { ExerciseActivityTypeViewModel } from './exercise-activity-type-view-model';
export interface ExerciseActivityViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'source'?: EnumActivitySource;
    'id': string;
    'title': string;
    'description'?: string;
    'dateOccurred': number;
    'activityType': ExerciseActivityTypeViewModel;
    'attributes': Array<ExerciseActivityAttributeViewModel>;
}
