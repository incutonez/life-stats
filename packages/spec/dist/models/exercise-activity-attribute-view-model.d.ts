import { AttributeTypeViewModel } from './attribute-type-view-model';
import { EnumUnitTypes } from './enum-unit-types';
import { ExerciseActivityViewModel } from './exercise-activity-view-model';
export interface ExerciseActivityAttributeViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'unit'?: EnumUnitTypes;
    'unitDisplay'?: EnumUnitTypes;
    'id': string;
    'activity'?: ExerciseActivityViewModel;
    'attributeType': AttributeTypeViewModel;
    'value': string;
    'valueDisplay'?: string;
}
