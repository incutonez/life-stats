import { Injectable } from "@nestjs/common";
import { RoutineModel } from "@/exercises/models/RoutineModel";
import { RoutinesMapper } from "@/exercises/routines/routines.mapper";
import { RoutineViewModel } from "@/exercises/viewModels/routine.viewmodel";

@Injectable()
export class RoutinesService {
	constructor(private mapper: RoutinesMapper) {}

	async getRoutine(id: string) {
		const entity = await RoutineModel.findByPk(id);
		if (entity) {
			return this.mapper.entityToViewModel(entity);
		}
	}

	async createRoutine(viewModel: RoutineViewModel) {
		const entity = await RoutineModel.create(this.mapper.viewModelToEntity(viewModel));
		if (entity) {
			return this.getRoutine(entity.id);
		}
	}
}
