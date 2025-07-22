import { EnumUnitTypes } from "@/constants";
import { ActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { ModelInterface, OmitRecursively } from "@/types";
import { AttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";

export type IActivityAttributeViewModel = ModelInterface<ActivityAttributeViewModel>;

export type IActivityAttributeCreateViewModel = OmitRecursively<ActivityAttributeViewModel, "id">;

export class ActivityAttributeViewModel extends BaseViewModel {
	declare id: string;

	declare value: string;

	@ApiEnum({
		EnumUnitTypes,
	})
	declare unit?: EnumUnitTypes;

	@ApiEnum({
		EnumUnitTypes,
	})
	declare unitDisplay?: EnumUnitTypes;

	declare valueDisplay?: string;

	declare activity?: ActivityViewModel;

	declare attributeType: AttributeTypeViewModel;
}
