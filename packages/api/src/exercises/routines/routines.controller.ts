import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoutinesService } from "@/exercises/routines/routines.service";
import { RoutineViewModel } from "@/exercises/viewModels/routine.viewmodel";

@ApiTags("routines")
@Controller("routines")
export class RoutinesController {
	constructor(private readonly service: RoutinesService) {}

	@Post("")
	async createRoutine(@Body() viewModel: RoutineViewModel): Promise<RoutineViewModel> {
		const response = await this.service.createRoutine(viewModel);
		if (response) {
			return response;
		}
		throw new NotFoundException("Routine not created");
	}
}
