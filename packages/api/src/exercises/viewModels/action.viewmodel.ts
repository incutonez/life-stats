import { OmitType } from "@nestjs/swagger";
import { ActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";
import { ModelInterface } from "@/types";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export type IActionViewModel = ModelInterface<ActionViewModel>;

export type IActionNestedViewModel = ModelInterface<ActionNestedViewModel>;

export class ActionViewModel extends BaseViewModel {
	declare actionType: ActionTypeViewModel;

	declare order: number;

	declare value: string;
}

export class ActionNestedViewModel extends OmitType(ActionViewModel, ["actionType"]) {}
