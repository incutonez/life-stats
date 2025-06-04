import { EnumUnitTypes } from './enum-unit-types';
import { ExerciseActivityViewModel } from './exercise-activity-view-model';
import { ExerciseAttributeTypeViewModel } from './exercise-attribute-type-view-model';
export interface ExerciseActivityAttributeViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'unit'?: EnumUnitTypes;
    'unitDisplay'?: EnumUnitTypes;
    'id': string;
    'activity'?: ExerciseActivityViewModel;
    'attributeType': ExerciseAttributeTypeViewModel;
    'value': string;
    'valueDisplay'?: string;
}
