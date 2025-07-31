import type { ActivityAttributeViewModel } from './activity-attribute-view-model';
import type { EnumFeatures } from './enum-features';
export interface AttributeTypeViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'feature'?: EnumFeatures;
    'name': string;
    'activityAttributes'?: Array<ActivityAttributeViewModel>;
}
