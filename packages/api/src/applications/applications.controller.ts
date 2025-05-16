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
import { ApplicationsService } from "src/applications/applications.service";
import { ApplicationsUploadViewModel } from "@/applications/types";
import {
	ApplicationViewModel, IApplicationBulkViewModel,
	IApplicationCreateViewModel,
} from "@/viewModels/application.viewmodel";
import { ApiPaginatedRequest } from "@/viewModels/base.list.viewmodel";

@ApiTags("applications")
@Controller("applications")
export class ApplicationsController {
	constructor(private readonly service: ApplicationsService) {
	}

	@Post("list")
	@HttpCode(HttpStatus.OK)
	async listApplications(@Body() body: ApiPaginatedRequest) {
		return this.service.listApplications(body);
	}

	@Post("upload")
	@ApiConsumes("multipart/form-data")
	@UseInterceptors(FileInterceptor("file"))
	@ApiOkResponse({
		type: [ApplicationViewModel],
	})
	async uploadApplications(@Body() { addHeaders }: ApplicationsUploadViewModel, @UploadedFile("file") file: Express.Multer.File): Promise<IApplicationCreateViewModel[]> {
		return this.service.uploadApplications(file, addHeaders);
	}

	@Post("bulk")
	@ApiBody({
		type: [ApplicationViewModel],
	})
	async createApplications(@Body() applications: ApplicationViewModel[]): Promise<IApplicationBulkViewModel> {
		return this.service.createApplications(applications);
	}

	@Post("")
	async createApplication(@Body() application: ApplicationViewModel): Promise<IApplicationCreateViewModel> {
		const response = await this.service.createApplication(application);
		if (response) {
			return response;
		}
		throw new NotFoundException("Invalid Application Create");
	}

	@Put(":applicationId")
	async updateApplication(@Body() application: ApplicationViewModel, @Param("applicationId") _applicationId: string): Promise<ApplicationViewModel> {
		const response = await this.service.updateApplication(application);
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
