import { Provider } from "@nestjs/common";
import { ATTRIBUTE_TYPES_REPOSITORY } from "@/constants";
import { AttributeTypeModel } from "@/db/models/AttributeTypeModel";
import { UserModel } from "@/db/models/UserModel";

export const SystemModels = [UserModel, AttributeTypeModel];

export const AttributeTypesRepository: Provider = {
	provide: ATTRIBUTE_TYPES_REPOSITORY,
	useValue: AttributeTypeModel,
};

export type AttributeTypesRepository = typeof AttributeTypeModel;
