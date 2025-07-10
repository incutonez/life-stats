import type { UserSettingsViewModel } from './user-settings-view-model';
export interface UserViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'firstName': string;
    'lastName'?: string;
    'email': string;
    'nickname'?: string;
    'id': string;
    'lastAccessed': number;
    'settings': UserSettingsViewModel;
}
