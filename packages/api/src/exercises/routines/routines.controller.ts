import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoutinesService } from "@/exercises/routines/routines.service";
import { RoutineListViewModel, RoutineViewModel } from "@/exercises/viewModels/routine.viewmodel";

@ApiTags("routines")
@Controller("routines")
export class RoutinesController {
	constructor(private readonly service: RoutinesService) {}

	@Get("")
	async getRoutines(): Promise<RoutineListViewModel> {
		return this.service.getRoutines();
	}

	@Post("")
	async createRoutine(@Body() viewModel: RoutineViewModel): Promise<RoutineViewModel> {
		const response = await this.service.createRoutine(viewModel);
		if (response) {
			return response;
		}
		throw new NotFoundException("Routine not created");
	}

	@Get(":routineId")
	async getRoutine(@Param("routineId") routineId: string): Promise<RoutineViewModel> {
		const response = await this.service.getRoutine(routineId);
		if (response) {
			return response;
		}
		throw new NotFoundException("Routine not found");
	}

	@Put(":routineId")
	async updateRoutine(@Param("routineId") routineId: string, @Body() viewModel: RoutineViewModel): Promise<RoutineViewModel> {
		const response = await this.service.updateRoutine(routineId, viewModel);
		if (response) {
			return response;
		}
		throw new NotFoundException("Routine not found");
	}

	@Delete(":routineId")
	async deleteRoutine(@Param("routineId") routineId: string): Promise<void> {
		await this.service.deleteRoutine(routineId);
	}
}
