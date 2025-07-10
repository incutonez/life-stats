import { ActivityActionViewModel } from "@/exercises/viewModels/activity.action.viewmodel";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export type IActivityActionTypeViewModel = ModelInterface<ActivityActionTypeViewModel>;

export class ActivityActionTypeViewModel extends BaseViewModel {
	declare id: string;

	declare name: string;

	actions?: ActivityActionViewModel[];
}
