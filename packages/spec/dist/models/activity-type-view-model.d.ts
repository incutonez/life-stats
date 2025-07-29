import type { ActivityViewModel } from './activity-view-model';
export interface ActivityTypeViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'activities'?: Array<ActivityViewModel>;
    'name': string;
}
