import { EnumAttributeType } from "@/exercises/constants";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";
import { ExerciseActivityAttributeViewModel } from "@/viewModels/exercises/exercise.activity.attribute.viewmodel";

export type IExerciseAttributeTypeViewModel = ModelInterface<ExerciseAttributeTypeViewModel>;

export type IExerciseAttributeTypeCreateViewModel = ModelInterface<ExerciseAttributeTypeCreateViewModel>;

export class ExerciseAttributeTypeCreateViewModel extends BaseViewModel {
	declare name: string;

	@ApiEnum({
		EnumAttributeType,
	})
	declare type: EnumAttributeType;
}

export class ExerciseAttributeTypeViewModel extends ExerciseAttributeTypeCreateViewModel {
	declare id: string;

	declare attributes?: ExerciseActivityAttributeViewModel[];
}
