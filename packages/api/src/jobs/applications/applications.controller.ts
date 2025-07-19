import {
	Body,
	Controller, Delete,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	Post, Put, UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UseValidationPipe } from "@/constants";
import { ApplicationsService } from "@/jobs/applications/applications.service";
import { ApplicationsUploadViewModel } from "@/jobs/applications/types";
import { ApplicationViewModel, IApplicationCreateViewModel } from "@/jobs/viewModels/application.viewmodel";
import { IUploadViewModelsResponse } from "@/types";
import { ApiPaginatedRequest } from "@/viewModels/base.list.viewmodel";

@ApiTags("applications")
@Controller({
	path: "applications",
})
export class ApplicationsController {
	constructor(private readonly service: ApplicationsService) {
	}

	@Post("list")
	@HttpCode(HttpStatus.OK)
	async listApplications(@Body() _body: ApiPaginatedRequest) {
		return this.service.listApplications();
	}

	@Post("upload")
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FileInterceptor("file"))
	@ApiOkResponse({
		type: [ApplicationViewModel],
	})
	@UseValidationPipe()
	async uploadApplications(@Body() { addHeaders }: ApplicationsUploadViewModel, @UploadedFile("file") file: Express.Multer.File): Promise<IApplicationCreateViewModel[]> {
		return this.service.uploadApplications(file, addHeaders);
	}

	@Post("bulk")
	@ApiBody({
		type: [ApplicationViewModel],
	})
	@UseValidationPipe()
	async createApplications(@Body() applications: ApplicationViewModel[]): Promise<IUploadViewModelsResponse> {
		return this.service.createApplications(applications);
	}

	@Post("")
	@UseValidationPipe()
	async createApplication(@Body() application: ApplicationViewModel): Promise<ApplicationViewModel> {
		const response = await this.service.createApplication(application);
		if (response) {
			return response;
		}
		throw new NotFoundException("Invalid Application Create");
	}

	@Put(":applicationId")
	@UseValidationPipe()
	async updateApplication(@Body() application: ApplicationViewModel, @Param("applicationId") applicationId: string): Promise<ApplicationViewModel> {
		const response = await this.service.updateApplication(applicationId, application);
		if (response) {
			return response;
		}
		throw new NotFoundException("Invalid Application Update");
	}

	@Get(":applicationId")
	async getApplication(@Param("applicationId") applicationId: string): Promise<ApplicationViewModel> {
		const response = await this.service.getApplication(applicationId);
		if (response) {
			return response;
		}
		throw new NotFoundException("Invalid Application ID");
	}

	@Delete(":applicationId")
	@HttpCode(HttpStatus.NO_CONTENT)
	async deleteApplication(@Param("applicationId") applicationId: string): Promise<void> {
		await this.service.deleteApplication(applicationId);
	}
}
