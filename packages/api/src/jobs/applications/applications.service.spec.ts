import { Test, TestingModule } from "@nestjs/testing";
import { ClsModule, ClsService } from "nestjs-cls";
import { beforeEach, describe, expect, it } from "vitest";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ApplicationsMapper } from "@/jobs/applications/applications.mapper";
import { ApplicationsService } from "@/jobs/applications/applications.service";
import { CommentsMapper } from "@/jobs/applications/comments.mapper";
import { CompaniesMapper } from "@/jobs/companies/companies.mapper";
import { CompaniesService } from "@/jobs/companies/companies.service";
import { ISessionStorage } from "@/types";
import { TestApplicationsRepository, TestApplicationsViewModels } from "../../../test/applications";
import { DefaultContext } from "../../../test/storage";

describe("ApplicationsService", () => {
	let service: ApplicationsService;
	let clsService: ClsService<ISessionStorage>;

	beforeEach(async () => {
		const module: TestingModule = (await Test.createTestingModule({
			providers: [
				ApplicationsService,
				ApplicationsMapper,
				CommentsMapper,
				CompaniesMapper,
				CompaniesService,
				{
					provide: SESSION_STORAGE,
					useClass: SessionStorageService,
				},
				TestApplicationsRepository,
			],
			imports: [
				ClsModule,
			],
		}).compile());
		/**
		 * This is needed for when onModuleInit is called in a class
		 * Source: https://stackoverflow.com/a/58079774/1253609
		 */
		await module.init();

		service = module.get(ApplicationsService);
		clsService = module.get(ClsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should list applications", async () => {
		const response = await clsService.runWith(DefaultContext, () => service.listApplications({
			start: 0,
			limit: 25,
			page: 1,
		}));
		expect(response).toStrictEqual({
			data: TestApplicationsViewModels,
			total: TestApplicationsViewModels.length,
		});
	});
});
