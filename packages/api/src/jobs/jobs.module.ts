import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { ApplicationsModule } from "@/jobs/applications/applications.module";
import { CompaniesModule } from "@/jobs/companies/companies.module";

@Module({
	imports: [
		ApplicationsModule,
		CompaniesModule,
		RouterModule.register([{
			path: "jobs",
			children: [ApplicationsModule, CompaniesModule],
		}]),
	],
})
export class JobsModule {}
