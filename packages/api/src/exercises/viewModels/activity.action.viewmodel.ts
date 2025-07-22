import { ActionViewModel } from "@/exercises/viewModels/action.viewmodel";
import { ActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { ModelInterface } from "@/types";

export type IActivityActionViewModel = ModelInterface<ActivityActionViewModel>;

export class ActivityActionViewModel extends ActionViewModel {
	activity?: ActivityViewModel;
}
