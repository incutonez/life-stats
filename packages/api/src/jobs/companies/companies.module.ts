import { forwardRef, Module } from "@nestjs/common";
import { ApplicationsModule } from "@/jobs/applications/applications.module";
import { CompaniesController } from "@/jobs/companies/companies.controller";
import { CompaniesMapper } from "@/jobs/companies/companies.mapper";
import { CompaniesService } from "@/jobs/companies/companies.service";
import { CompaniesRepository } from "@/jobs/models";

@Module({
	controllers: [CompaniesController],
	providers: [CompaniesService, CompaniesMapper, CompaniesRepository],
	exports: [CompaniesService, CompaniesMapper],
	imports: [forwardRef(() => ApplicationsModule)],
})
export class CompaniesModule {
}
