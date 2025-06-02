import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ExercisesService } from "@/exercises/exercises.service";

@ApiTags("exercises")
@Controller("exercises")
export class ExercisesController {
	constructor(private readonly service: ExercisesService) {}

	@Get("history")
	async getExercisesHistory() {
		return this.service.getHistory();
	}
}
