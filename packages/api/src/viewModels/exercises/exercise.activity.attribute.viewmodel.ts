import { EnumUnitTypes } from "@/constants";
import { ModelInterface } from "@/types";
import { AttributeTypeCreateViewModel, AttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";
import {
	ExerciseActivityCreateViewModel,
	ExerciseActivityViewModel,
} from "@/viewModels/exercises/exercise.activity.viewmodel";

export type IExerciseActivityAttributeViewModel = ModelInterface<ExerciseActivityAttributeViewModel>;

export type IExerciseActivityAttributeCreateViewModel = ModelInterface<ExerciseActivityAttributeCreateViewModel>;

export class ExerciseActivityAttributeCreateViewModel extends BaseViewModel {
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

	declare activity?: ExerciseActivityCreateViewModel;

	declare attributeType: AttributeTypeCreateViewModel;
}

export class ExerciseActivityAttributeViewModel extends ExerciseActivityAttributeCreateViewModel {
	declare id: string;

	declare activity?: ExerciseActivityViewModel;

	declare attributeType: AttributeTypeViewModel;
}
