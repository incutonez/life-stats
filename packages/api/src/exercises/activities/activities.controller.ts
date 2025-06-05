import {
	Body,
	Controller, Delete,
	Get,
	HttpCode, HttpStatus,
	NotFoundException,
	Param,
	Post, Put,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UseValidationPipe } from "@/constants";
import { ActivitiesService } from "@/exercises/activities/activities.service";
import { EnumActivitySource } from "@/exercises/constants";
import { ExerciseActivityUpload } from "@/exercises/types";
import { IUploadViewModelsResponse } from "@/types";
import {
	ExerciseActivityCreateViewModel,
	ExerciseActivityViewModel, IExerciseActivityCreateViewModel,
} from "@/viewModels/exercises/exercise.activity.viewmodel";

@ApiTags("activities")
@Controller("activities")
export class ActivitiesController {
	constructor(private readonly service: ActivitiesService) {
	}

	@Post("list")
	@HttpCode(HttpStatus.OK)
	async listActivities() {
		return this.service.listActivities();
	}

	@Post("import/:source")
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FileInterceptor("file"))
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: [ExerciseActivityCreateViewModel],
	})
	async importActivities(@Body() _body: ExerciseActivityUpload, @UploadedFile("file") file: Express.Multer.File, @Param("source") source: EnumActivitySource): Promise<IExerciseActivityCreateViewModel[]> {
		return this.service.importActivities(file, source);
	}

	@Post("upload")
	@UseValidationPipe()
	async uploadActivities(@Body() models: ExerciseActivityCreateViewModel[]): Promise<IUploadViewModelsResponse> {
		return this.service.uploadActivities(models);
	}

	@Post("")
	@UseValidationPipe()
	async createActivity(@Body() viewModel: ExerciseActivityCreateViewModel): Promise<ExerciseActivityViewModel> {
		const response = await this.service.createActivityWithResponse(viewModel);
		if (response) {
			return response;
		}
		throw new NotFoundException("No activity found");
	}

	@Get(":activityId")
	async getActivity(@Param("activityId") activityId: string): Promise<ExerciseActivityViewModel> {
		const response = await this.service.getActivity(activityId);
		if (response) {
			return response;
		}
		throw new NotFoundException("No activity found");
	}

	@Put(":activityId")
	@UseValidationPipe()
	async updateActivity(@Param("activityId") _activityId: string, @Body() viewModel: ExerciseActivityViewModel): Promise<ExerciseActivityViewModel> {
		const response = await this.service.updateActivity(viewModel);
		if (response) {
			return response;
		}
		throw new NotFoundException("No activity found");
	}

	@Delete(":activityId")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteActivity(@Param("activityId") activityId: string): Promise<void> {
		await this.service.deleteActivity(activityId);
	}
}
