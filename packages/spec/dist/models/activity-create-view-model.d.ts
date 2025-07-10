import type { ActivityActionViewModel } from './activity-action-view-model';
import type { ActivityAttributeCreateViewModel } from './activity-attribute-create-view-model';
import type { ActivityTypeCreateViewModel } from './activity-type-create-view-model';
import type { EnumActivitySource } from './enum-activity-source';
export interface ActivityCreateViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'source'?: EnumActivitySource;
    'title': string;
    'weight'?: number;
    'duration'?: number;
    'description'?: string;
    'sourceId'?: string;
    'dateOccurred': number;
    'activityType': ActivityTypeCreateViewModel;
    'attributes': Array<ActivityAttributeCreateViewModel>;
    'actions': Array<ActivityActionViewModel>;
    'calories'?: number;
    'weightLost'?: number;
}
