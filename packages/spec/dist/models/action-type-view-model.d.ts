import type { ActionNestedViewModel } from './action-nested-view-model';
export interface ActionTypeViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'id': string;
    'name': string;
    'actions'?: Array<ActionNestedViewModel>;
    'routines'?: Array<ActionNestedViewModel>;
}
