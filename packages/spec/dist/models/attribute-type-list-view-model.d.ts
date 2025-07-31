import type { EnumFeatures } from './enum-features';
export interface AttributeTypeListViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'feature'?: EnumFeatures;
    'name': string;
    'attributes': number;
}
