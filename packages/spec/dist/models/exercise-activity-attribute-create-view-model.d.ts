import { AttributeTypeCreateViewModel } from './attribute-type-create-view-model';
import { EnumUnitTypes } from './enum-unit-types';
import { ExerciseActivityCreateViewModel } from './exercise-activity-create-view-model';
export interface ExerciseActivityAttributeCreateViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'unit'?: EnumUnitTypes;
    'unitDisplay'?: EnumUnitTypes;
    'value': string;
    'valueDisplay'?: string;
    'activity'?: ExerciseActivityCreateViewModel;
    'attributeType': AttributeTypeCreateViewModel;
}
