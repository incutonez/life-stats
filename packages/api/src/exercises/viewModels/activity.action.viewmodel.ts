import { ActionViewModel } from "@/exercises/viewModels/action.viewmodel";
import { ActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";

export class ActivityActionViewModel extends ActionViewModel {
	activity?: ActivityViewModel;
}
