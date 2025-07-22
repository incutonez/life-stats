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
import { ApiEnum } from "@/viewModels/decorators";

export type IActivityViewModel = ModelInterface<ActivityViewModel>;

export type IActivityCreateViewModel = OmitRecursively<IActivityViewModel, "id">;

export class ActivityViewModel extends BaseViewModel {
	declare id: string;

	declare title: string;

	declare weight?: number;

	declare duration?: number;

	declare description?: string;

	@ApiEnum({
		EnumActivitySource,
	})
	declare source?: EnumActivitySource;

	declare sourceId?: string;

	declare dateOccurred: number;

	declare activityType: ActivityTypeViewModel;

	actions?: ActivityActionViewModel[] = [];

	declare calories?: number;

	declare weightLost?: number;

	attributes?: ActivityAttributeViewModel[] = [];
}

export class ActivityListViewModel extends GetResponseModel<ActivityViewModel>(ActivityViewModel) {}
