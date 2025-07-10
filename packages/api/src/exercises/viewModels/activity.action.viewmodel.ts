import { ActivityActionTypeViewModel } from "@/exercises/viewModels/activity.action.type.viewmodel";
import { ActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export type IActivityActionViewModel = ModelInterface<ActivityActionViewModel>;

export class ActivityActionViewModel extends BaseViewModel {
	declare id: string;

	declare actionType: ActivityActionTypeViewModel;

	declare order: number;

	declare value: string;

	activity?: ActivityViewModel;
}
