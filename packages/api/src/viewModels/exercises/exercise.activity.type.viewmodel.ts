import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ExerciseActivityViewModel } from "@/viewModels/exercises/exercise.activity.viewmodel";

export type IExerciseActivityTypeViewModel = ModelInterface<ExerciseActivityTypeViewModel>;

export class ExerciseActivityTypeViewModel extends BaseViewModel {
	declare id: string;

	declare name: string;

	activities?: ExerciseActivityViewModel[];
}
