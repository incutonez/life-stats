﻿import { EnumActivitySource } from "@/exercises/constants";
import { ModelInterface } from "@/types";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum } from "@/viewModels/decorators";
import {
	ExerciseActivityAttributeCreateViewModel,
	ExerciseActivityAttributeViewModel,
} from "@/viewModels/exercises/exercise.activity.attribute.viewmodel";
import {
	ExerciseActivityTypeCreateViewModel,
	ExerciseActivityTypeViewModel,
} from "@/viewModels/exercises/exercise.activity.type.viewmodel";

export type IExerciseActivityViewModel = ModelInterface<ExerciseActivityViewModel>;

export type IExerciseActivityCreateViewModel = ModelInterface<ExerciseActivityCreateViewModel>;

export class ExerciseActivityCreateViewModel extends BaseViewModel {
	declare title: string;

	declare description?: string;

	@ApiEnum({
		EnumActivitySource,
	})
	declare source?: EnumActivitySource;

	declare dateOccurred: number;

	declare activityType: ExerciseActivityTypeCreateViewModel;

	declare attributes: ExerciseActivityAttributeCreateViewModel[];
}

export class ExerciseActivityViewModel extends ExerciseActivityCreateViewModel {
	declare id: string;

	declare activityType: ExerciseActivityTypeViewModel;

	declare attributes: ExerciseActivityAttributeViewModel[];
}

export class ExerciseActivityListViewModel extends GetResponseModel<ExerciseActivityViewModel>(ExerciseActivityViewModel) {}
