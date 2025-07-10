import type { EnumFeatures } from './enum-features';
export interface AttributeTypeCreateViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'feature'?: EnumFeatures;
    'name': string;
}
