import { ActivityActionViewModel } from "@/exercises/viewModels/activity.action.viewmodel";
import { RoutineActionViewModel } from "@/exercises/viewModels/routine.action.viewmodel";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export type IActionTypeViewModel = ModelInterface<ActionTypeViewModel>;

export class ActionTypeViewModel extends BaseViewModel {
	declare id: string;

	declare name: string;

	actions?: ActivityActionViewModel[];

	routines?: RoutineActionViewModel[];
}
