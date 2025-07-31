import { EnumUnitTypes } from "@/constants";
import { ActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { ModelInterface, OmitRecursively } from "@/types";
import { AttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";

export type IActivityAttributeViewModel = ModelInterface<ActivityAttributeViewModel>;

export type IActivityAttributeCreateViewModel = OmitRecursively<ActivityAttributeViewModel, "id">;

export class ActivityAttributeViewModel extends BaseViewModel {
	value: string;

	@ApiEnum({
		EnumUnitTypes,
	})
	unit?: EnumUnitTypes;

	@ApiEnum({
		EnumUnitTypes,
	})
	unitDisplay?: EnumUnitTypes;

	valueDisplay?: string;

	activity?: ActivityViewModel;

	attributeType?: AttributeTypeViewModel;
}
