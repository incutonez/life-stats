import { EnumAttributeType } from './enum-attribute-type';
export interface ExerciseAttributeTypeCreateViewModel {
    'userId'?: string;
    'dateCreated'?: number;
    'dateUpdated'?: number;
    'type': EnumAttributeType;
    'name': string;
}
