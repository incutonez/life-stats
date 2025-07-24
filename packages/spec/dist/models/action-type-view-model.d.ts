import type { ActionNestedViewModel } from './action-nested-view-model';
export interface ActionTypeViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'name': string;
    'activities'?: Array<ActionNestedViewModel>;
    'routines'?: Array<ActionNestedViewModel>;
}
