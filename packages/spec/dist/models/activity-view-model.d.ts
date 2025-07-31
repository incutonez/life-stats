import type { ActivityActionViewModel } from './activity-action-view-model';
import type { ActivityAttributeViewModel } from './activity-attribute-view-model';
import type { ActivityTypeViewModel } from './activity-type-view-model';
import type { EnumActivitySource } from './enum-activity-source';
export interface ActivityViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'source'?: EnumActivitySource;
    'title': string;
    'dateOccurred': number;
    'activityType'?: ActivityTypeViewModel;
    'weight'?: number;
    'duration'?: number;
    'description'?: string;
    'sourceId'?: string;
    'actions'?: Array<ActivityActionViewModel>;
    'calories'?: number;
    'weightLost'?: number;
    'attributes'?: Array<ActivityAttributeViewModel>;
}
