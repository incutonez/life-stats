import {
	Body,
	Controller, Delete,
	Get,
	HttpCode, HttpStatus,
	NotFoundException,
	Param,
	Post,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ActivitiesService } from "@/exercises/activities/activities.service";
import { EnumActivitySource } from "@/exercises/constants";
import { ExerciseActivityUpload } from "@/exercises/types";
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
	@ApiBody({
		type: [ExerciseActivityCreateViewModel],
	})
	async uploadActivities(@Body() models: IExerciseActivityCreateViewModel[]): Promise<ExerciseActivityViewModel[]> {
		return this.service.uploadActivities(models);
	}

	@Get(":activityId")
	async getActivity(@Param("activityId") activityId: string): Promise<ExerciseActivityViewModel> {
		const response = await this.service.getActivity(activityId);
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
