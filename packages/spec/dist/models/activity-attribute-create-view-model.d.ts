import type { ActivityCreateViewModel } from './activity-create-view-model';
import type { AttributeTypeCreateViewModel } from './attribute-type-create-view-model';
import type { EnumUnitTypes } from './enum-unit-types';
export interface ActivityAttributeCreateViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'unit'?: EnumUnitTypes;
    'unitDisplay'?: EnumUnitTypes;
    'value': string;
    'valueDisplay'?: string;
    'activity'?: ActivityCreateViewModel;
    'attributeType': AttributeTypeCreateViewModel;
}
