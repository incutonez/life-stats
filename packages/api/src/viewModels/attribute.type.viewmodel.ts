import { EnumFeatures } from "@/constants";
import { ActivityAttributeViewModel } from "@/exercises/viewModels/activity.attribute.viewmodel";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";

export type IAttributeTypeViewModel = ModelInterface<AttributeTypeViewModel>;

export class AttributeTypeListViewModel extends BaseViewModel {
	name: string;

	@ApiEnum({
		EnumFeatures,
	})
	feature?: EnumFeatures;

	attributes: number;
}

export class AttributeTypeViewModel extends BaseViewModel {
	name: string;

	@ApiEnum({
		EnumFeatures,
	})
	feature?: EnumFeatures;

	activityAttributes?: ActivityAttributeViewModel[];
}
