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
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UseValidationPipe } from "@/constants";
import { ActivitiesService } from "@/exercises/activities/activities.service";
import { StravaService } from "@/exercises/activities/strava.service";
import { EnumActivitySource } from "@/exercises/constants";
import { ExerciseActivityUpload } from "@/exercises/types";
import { IUploadViewModelsResponse } from "@/types";
import { ExerciseActivityTypeViewModel } from "@/viewModels/exercises/exercise.activity.type.viewmodel";
import {
	ExerciseActivityCreateViewModel,
	ExerciseActivityViewModel, IExerciseActivityCreateViewModel,
} from "@/viewModels/exercises/exercise.activity.viewmodel";
import { StravaTokenViewModel } from "@/viewModels/exercises/strava.token.viewmodel";

@ApiTags("activities")
@Controller("activities")
export class ActivitiesController {
	constructor(private readonly service: ActivitiesService, private readonly stravaService: StravaService) {
	}

	@Post("list")
	@HttpCode(HttpStatus.OK)
	async listActivities() {
		return this.service.listActivities();
	}

	@Post("strava/import")
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FileInterceptor("file"))
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: [ExerciseActivityCreateViewModel],
	})
	async importStravaActivities(@Body() _body: ExerciseActivityUpload, @UploadedFile("file") file: Express.Multer.File): Promise<IExerciseActivityCreateViewModel[]> {
		return this.stravaService.importActivities(file, EnumActivitySource.Strava);
	}

	@Post("strava/upload")
	@ApiBody({
		type: [ExerciseActivityCreateViewModel],
	})
	@UseValidationPipe()
	async uploadStravaActivities(@Body() models: ExerciseActivityCreateViewModel[]): Promise<IUploadViewModelsResponse> {
		return this.stravaService.uploadActivities(models);
	}

	@Post("strava/sync")
	@UseValidationPipe()
	async syncStravaActivities(@Body() body: StravaTokenViewModel) {
		return this.stravaService.syncActivities(body);
	}

	@Get("activity-types")
	async getActivityTypes(): Promise<ExerciseActivityTypeViewModel[]> {
		return this.service.getActivityTypes();
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
