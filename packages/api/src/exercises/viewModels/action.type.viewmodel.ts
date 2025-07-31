import { ActionNestedViewModel } from "@/exercises/viewModels/action.viewmodel";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export type IActionTypeViewModel = ModelInterface<ActionTypeViewModel>;

export class ActionTypeViewModel extends BaseViewModel {
	name: string;

	activities?: ActionNestedViewModel[];

	routines?: ActionNestedViewModel[];
}
