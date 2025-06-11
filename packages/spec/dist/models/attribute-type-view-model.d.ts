import { EnumFeatures } from './enum-features';
export interface AttributeTypeViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'feature'?: EnumFeatures;
    'id': string;
    'name': string;
}
