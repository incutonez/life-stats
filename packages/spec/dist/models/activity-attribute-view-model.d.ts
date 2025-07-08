import type { ActivityViewModel } from './activity-view-model';
import type { AttributeTypeViewModel } from './attribute-type-view-model';
import type { EnumUnitTypes } from './enum-unit-types';
export interface ActivityAttributeViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'unit'?: EnumUnitTypes;
    'unitDisplay'?: EnumUnitTypes;
    'id': string;
    'activity'?: ActivityViewModel;
    'attributeType': AttributeTypeViewModel;
    'value': string;
    'valueDisplay'?: string;
}
