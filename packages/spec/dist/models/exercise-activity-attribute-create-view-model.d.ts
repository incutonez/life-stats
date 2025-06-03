import { EnumUnitTypes } from './enum-unit-types';
import { ExerciseActivityCreateViewModel } from './exercise-activity-create-view-model';
import { ExerciseAttributeTypeCreateViewModel } from './exercise-attribute-type-create-view-model';
export interface ExerciseActivityAttributeCreateViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'unit'?: EnumUnitTypes;
    'unitDisplay'?: EnumUnitTypes;
    'value': string;
    'activity'?: ExerciseActivityCreateViewModel;
    'attributeType': ExerciseAttributeTypeCreateViewModel;
}
