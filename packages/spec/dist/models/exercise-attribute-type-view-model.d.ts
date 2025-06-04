import { EnumAttributeType } from './enum-attribute-type';
import { ExerciseActivityAttributeViewModel } from './exercise-activity-attribute-view-model';
export interface ExerciseAttributeTypeViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'type': EnumAttributeType;
    'id': string;
    'attributes'?: Array<ExerciseActivityAttributeViewModel>;
    'name': string;
}
