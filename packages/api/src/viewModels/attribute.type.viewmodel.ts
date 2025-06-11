import { EnumFeatures } from "@/constants";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";

export type IAttributeTypeViewModel = ModelInterface<AttributeTypeViewModel>;
export type IAttributeTypeCreateViewModel = ModelInterface<AttributeTypeCreateViewModel>;

export class AttributeTypeCreateViewModel extends BaseViewModel {
	declare name: string;

	@ApiEnum({
		EnumFeatures,
	})
	declare feature?: EnumFeatures;
}

export class AttributeTypeViewModel extends AttributeTypeCreateViewModel {
	declare id: string;
}
