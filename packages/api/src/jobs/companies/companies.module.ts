import { forwardRef, Module } from "@nestjs/common";
import { ApplicationsModule } from "@/jobs/applications/applications.module";
import { CompaniesController } from "@/jobs/companies/companies.controller";
import { CompaniesMapper } from "@/jobs/companies/companies.mapper";
import { CompaniesService } from "@/jobs/companies/companies.service";

@Module({
	controllers: [CompaniesController],
	providers: [CompaniesService, CompaniesMapper],
	exports: [CompaniesService, CompaniesMapper],
	imports: [forwardRef(() => ApplicationsModule)],
})
export class CompaniesModule {
}
