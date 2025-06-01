import { EnumAttributeType } from "@/exercises/constants";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";
import {	ExerciseActivityAttributeViewModel } from "@/viewModels/exercises/exercise.activity.attribute.viewmodel";

export type IExerciseAttributeTypeViewModel = ModelInterface<ExerciseAttributeTypeViewModel>;

export class ExerciseAttributeTypeViewModel extends BaseViewModel {
	declare id: string;

	declare name: string;

	@ApiEnum({
		EnumAttributeType,
	})
	declare type: EnumAttributeType;

	declare attributes?: ExerciseActivityAttributeViewModel[];
}
