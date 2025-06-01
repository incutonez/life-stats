import { EnumUnitTypes } from "@/constants";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";
import { ExerciseActivityViewModel } from "@/viewModels/exercises/exercise.activity.viewmodel";
import {	ExerciseAttributeTypeViewModel } from "@/viewModels/exercises/exercise.attribute.type.viewmodel";

export type IExerciseActivityAttributeViewModel = ModelInterface<ExerciseActivityAttributeViewModel>;

export class ExerciseActivityAttributeViewModel extends BaseViewModel {
	declare id: string;

	declare value: string;

	@ApiEnum({
		EnumUnitTypes,
	})
	declare unit?: EnumUnitTypes;

	declare activity?: ExerciseActivityViewModel;

	declare attributeType: ExerciseAttributeTypeViewModel;
}
