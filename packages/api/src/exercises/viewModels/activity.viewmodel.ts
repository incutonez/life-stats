import { EnumActivitySource } from "@/exercises/constants";
import { ActivityActionViewModel } from "@/exercises/viewModels/activity.action.viewmodel";
import {
	ActivityAttributeViewModel,
} from "@/exercises/viewModels/activity.attribute.viewmodel";
import {
	ActivityTypeViewModel,
} from "@/exercises/viewModels/activity.type.viewmodel";
import { ModelInterface, OmitRecursively } from "@/types";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";
import { ApiEnum, TransformNull } from "@/viewModels/decorators";

export type IActivityViewModel = ModelInterface<ActivityViewModel>;

export type IActivityCreateViewModel = OmitRecursively<IActivityViewModel, "id">;

export class ActivityViewModel extends BaseViewModel {
	declare title: string;

	declare dateOccurred: number;

	declare activityType: ActivityTypeViewModel;

	@TransformNull()
	weight?: number;

	@TransformNull()
	duration?: number;

	@TransformNull()
	description?: string;

	@TransformNull()
	@ApiEnum({
		EnumActivitySource,
	})
	source?: EnumActivitySource;

	@TransformNull()
	sourceId?: string;

	@TransformNull()
	actions?: ActivityActionViewModel[];

	@TransformNull()
	calories?: number;

	@TransformNull()
	weightLost?: number;

	attributes?: ActivityAttributeViewModel[];
}

export class ActivityListViewModel extends GetResponseModel<ActivityViewModel>(ActivityViewModel) {}
