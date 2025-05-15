import { forwardRef, Module } from "@nestjs/common";
import { CompaniesController } from "src/companies/companies.controller";
import { CompaniesMapper } from "src/companies/companies.mapper";
import { CompaniesService } from "src/companies/companies.service";
import { ApplicationsModule } from "@/applications/applications.module";

@Module({
	controllers: [CompaniesController],
	providers: [CompaniesService, CompaniesMapper],
	exports: [CompaniesService, CompaniesMapper],
	imports: [forwardRef(() => ApplicationsModule)],
})
export class CompaniesModule {
}
