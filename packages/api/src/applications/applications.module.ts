import { forwardRef, Module } from "@nestjs/common";
import { ApplicationsController } from "src/applications/applications.controller";
import { ApplicationsMapper } from "src/applications/applications.mapper";
import { ApplicationsService } from "src/applications/applications.service";
import { CommentsMapper } from "@/applications/comments.mapper";
import { CompaniesModule } from "@/companies/companies.module";

@Module({
	controllers: [ApplicationsController],
	providers: [ApplicationsService, ApplicationsMapper, CommentsMapper],
	imports: [forwardRef(() => CompaniesModule)],
})
export class ApplicationsModule {
}
