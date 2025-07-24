import type { UserSettingsViewModel } from './user-settings-view-model';
export interface UserViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'firstName': string;
    'lastName'?: string;
    'email': string;
    'nickname'?: string;
    'lastAccessed': number;
    'settings': UserSettingsViewModel;
}
