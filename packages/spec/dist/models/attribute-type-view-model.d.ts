import type { EnumFeatures } from './enum-features';
export interface AttributeTypeViewModel {
    'id'?: string;
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'feature'?: EnumFeatures;
    'name': string;
}
