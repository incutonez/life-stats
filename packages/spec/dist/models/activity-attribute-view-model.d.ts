import type { ActivityViewModel } from './activity-view-model';
import type { AttributeTypeViewModel } from './attribute-type-view-model';
import type { EnumUnitTypes } from './enum-unit-types';
export interface ActivityAttributeViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'unit'?: EnumUnitTypes;
    'unitDisplay'?: EnumUnitTypes;
    'value': string;
    'attributeType': AttributeTypeViewModel;
    'valueDisplay'?: string;
    'activity'?: ActivityViewModel;
}
