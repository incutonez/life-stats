import { RoutineActionViewModel } from "@/exercises/viewModels/routine.action.viewmodel";
import { GetResponseModel } from "@/viewModels/base.list.viewmodel";
import { BaseViewModel } from "@/viewModels/BaseViewModel";

export class RoutineViewModel extends BaseViewModel {
	declare name: string;

	declare actions: RoutineActionViewModel[];
}

export class RoutineListViewModel extends GetResponseModel<RoutineViewModel>(RoutineViewModel) {}
