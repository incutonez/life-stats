import { EnumFeatures } from "@/constants";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";

export type IAttributeTypeViewModel = ModelInterface<AttributeTypeViewModel>;

export class AttributeTypeViewModel extends BaseViewModel {
	declare id: string;

	declare name: string;

	@ApiEnum({
		EnumFeatures,
	})
	declare feature?: EnumFeatures;
}
