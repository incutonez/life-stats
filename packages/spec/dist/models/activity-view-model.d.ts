import type { ActivityAttributeViewModel } from './activity-attribute-view-model';
import type { ActivityTypeViewModel } from './activity-type-view-model';
import type { EnumActivitySource } from './enum-activity-source';
export interface ActivityViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'source'?: EnumActivitySource;
    'id': string;
    'activityType': ActivityTypeViewModel;
    'attributes': Array<ActivityAttributeViewModel>;
    'title': string;
    'weight'?: number;
    'duration'?: number;
    'description'?: string;
    'sourceId'?: string;
    'dateOccurred': number;
    'calories'?: number;
    'weightLost'?: number;
}
