import { RoutineActionViewModel } from "@/exercises/viewModels/routine.action.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export class RoutineViewModel extends BaseViewModel {
	declare id: string;

	declare name: string;

	declare actions: RoutineActionViewModel[];
}
