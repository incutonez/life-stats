import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AuditsModule } from "@/audits/audits.module";
import { ApplicationsModule } from "@/jobs/applications/applications.module";
import { CompaniesModule } from "@/jobs/companies/companies.module";
import { JobsController } from "@/jobs/jobs.controller";
import { JobsService } from "@/jobs/jobs.service";

@Module({
	imports: [
		ApplicationsModule,
		CompaniesModule,
		AuditsModule,
		RouterModule.register([{
			path: "jobs",
			children: [ApplicationsModule, CompaniesModule],
		}]),
	],
	controllers: [JobsController],
	providers: [JobsService],
})
export class JobsModule {}
