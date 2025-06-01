import { EnumActivitySource } from "@/exercises/constants";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";
import {	ExerciseActivityAttributeViewModel } from "@/viewModels/exercises/exercise.activity.attribute.viewmodel";
import { ExerciseActivityTypeViewModel } from "@/viewModels/exercises/exercise.activity.type.viewmodel";

export type IExerciseActivityViewModel = ModelInterface<ExerciseActivityViewModel>;

export class ExerciseActivityViewModel extends BaseViewModel {
	declare id: string;

	declare title: string;

	declare description?: string;

	@ApiEnum({
		EnumActivitySource,
	})
	declare source?: EnumActivitySource;

	declare dateOccurred: number;

	declare activityType: ExerciseActivityTypeViewModel;

	declare attributes: ExerciseActivityAttributeViewModel[];
}
