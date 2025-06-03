import { EnumUnitTypes } from "@/constants";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";
import {
	ExerciseActivityCreateViewModel,
	ExerciseActivityViewModel,
} from "@/viewModels/exercises/exercise.activity.viewmodel";
import {
	ExerciseAttributeTypeCreateViewModel,
	ExerciseAttributeTypeViewModel,
} from "@/viewModels/exercises/exercise.attribute.type.viewmodel";

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

	declare activity?: ExerciseActivityCreateViewModel;

	declare attributeType: ExerciseAttributeTypeCreateViewModel;
}

export class ExerciseActivityAttributeViewModel extends ExerciseActivityAttributeCreateViewModel {
	declare id: string;

	declare activity?: ExerciseActivityViewModel;

	declare attributeType: ExerciseAttributeTypeViewModel;
}
