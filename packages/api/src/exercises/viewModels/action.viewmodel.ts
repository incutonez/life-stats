import { ActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export class ActionViewModel extends BaseViewModel {
	declare id: string;

	declare actionType: ActionTypeViewModel;

	declare order: number;

	declare value: string;
}
