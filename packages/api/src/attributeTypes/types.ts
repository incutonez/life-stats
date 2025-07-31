import { IsEnum } from "class-validator";
import { EnumFeatures } from "@/constants";

export class ListAttributeTypesParams {
	@IsEnum(EnumFeatures)
	feature: EnumFeatures;
}
