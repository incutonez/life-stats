import { EnumActivitySource } from './enum-activity-source';
import { ExerciseActivityAttributeCreateViewModel } from './exercise-activity-attribute-create-view-model';
import { ExerciseActivityTypeCreateViewModel } from './exercise-activity-type-create-view-model';
export interface ExerciseActivityCreateViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'source'?: EnumActivitySource;
    'title': string;
    'weight'?: number;
    'duration'?: number;
    'description'?: string;
    'sourceId'?: string;
    'dateOccurred': number;
    'activityType': ExerciseActivityTypeCreateViewModel;
    'attributes': Array<ExerciseActivityAttributeCreateViewModel>;
    'calories'?: number;
    'weightLost'?: number;
}
