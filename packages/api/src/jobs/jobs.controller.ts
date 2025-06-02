import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JobsService } from "@/jobs/jobs.service";

@ApiTags("jobs")
@Controller("jobs")
export class JobsController {
	constructor(private readonly service: JobsService) {}

	@Get("history")
	async getJobsHistory() {
		return this.service.getHistory();
	}
}
