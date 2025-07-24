import { ActionViewModel } from "@/exercises/viewModels/action.viewmodel";
import { RoutineViewModel } from "@/exercises/viewModels/routine.viewmodel";

export class RoutineActionViewModel extends ActionViewModel {
	routine?: RoutineViewModel;
}
