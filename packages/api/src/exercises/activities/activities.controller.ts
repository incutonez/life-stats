import { Body, Controller, Get, NotFoundException, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { ActivitiesService } from "@/exercises/activities/activities.service";
import { EnumActivitySource } from "@/exercises/constants";
import { ExerciseActivityUpload } from "@/exercises/types";
import { ExerciseActivityViewModel } from "@/viewModels/exercises/exercise.activity.viewmodel";

@ApiTags("activities")
@Controller("activities")
export class ActivitiesController {
	constructor(private readonly service: ActivitiesService) {
	}

	@Post("upload/:source")
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FileInterceptor("file"))
	async uploadActivityFromSource(@Body() _body: ExerciseActivityUpload, @UploadedFile("file") file: Express.Multer.File, @Param("source") source: EnumActivitySource): Promise<ExerciseActivityViewModel[]> {
		return this.service.uploadActivities(file, source);
	}

	@Get(":activityId")
	async getActivity(@Param("activityId") activityId: string): Promise<ExerciseActivityViewModel> {
		const response = await this.service.getActivity(activityId);
		if (response) {
			return response;
		}
		throw new NotFoundException("No activity found");
	}
}
