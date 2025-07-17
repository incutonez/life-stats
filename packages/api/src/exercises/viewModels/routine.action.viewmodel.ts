import { ActionViewModel } from "@/exercises/viewModels/action.viewmodel";
import { RoutineViewModel } from "@/exercises/viewModels/routine.viewmodel";
import { ModelInterface } from "@/types";

export type IRoutineActionViewModel = ModelInterface<RoutineActionViewModel>;

export class RoutineActionViewModel extends ActionViewModel {
	routine?: RoutineViewModel;
}
