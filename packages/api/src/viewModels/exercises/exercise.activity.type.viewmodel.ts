import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ExerciseActivityViewModel } from "@/viewModels/exercises/exercise.activity.viewmodel";

export type IExerciseActivityTypeViewModel = ModelInterface<ExerciseActivityTypeViewModel>;

export type IExerciseActivityTypeCreateViewModel = ModelInterface<ExerciseActivityTypeCreateViewModel>;

export class ExerciseActivityTypeCreateViewModel extends BaseViewModel {
	declare name: string;
}

export class ExerciseActivityTypeViewModel extends ExerciseActivityTypeCreateViewModel {
	declare id: string;

	activities?: ExerciseActivityViewModel[];
}
