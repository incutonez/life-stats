import { faker } from "@faker-js/faker";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { AuthGuardTest } from "@test/auth.guard.test";
import { TestUser } from "@test/users";
import { configDotenv } from "dotenv";
import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { AuthGuard } from "@/auth/auth.guard";
import { AuthModule } from "@/auth/auth.module";
import { AllModels } from "@/db/models";
import { EnumApplicationStatus, EnumLinkType, EnumLocationTypes } from "@/jobs/constants";
import { JobsModule } from "@/jobs/jobs.module";
import { urlToSite } from "@/jobs/utils";
import {
	ApplicationNestedViewModel,
	IApplicationCreateViewModel,
	IApplicationViewModel,
} from "@/jobs/viewModels/application.viewmodel";
import { CompanyFullViewModel } from "@/jobs/viewModels/company.viewmodel";
import { ModelInterface } from "@/types";

function mockApplicationCreate(): IApplicationViewModel {
	const url = faker.internet.url();
	return {
		url,
		status: EnumApplicationStatus.Applied,
		locationType: EnumLocationTypes.Remote,
		compensation: `${faker.finance.amount({
			symbol: "$",
		})}`,
		positionTitle: faker.person.jobTitle(),
		company: {
			name: faker.company.name(),
			userId: TestUser.user_id,
		},
		comments: [{
			comment: faker.lorem.paragraphs(),
			userId: TestUser.user_id,
		}, {
			comment: faker.lorem.paragraphs(),
			userId: TestUser.user_id,
		}],
		links: [],
		userId: TestUser.user_id,
		dateApplied: faker.date.soon().getTime(),
	};
}

function mockApplicationExpected(viewModel: IApplicationCreateViewModel): IApplicationViewModel {
	const expected = structuredClone(viewModel) as IApplicationViewModel;
	expected.site = urlToSite(viewModel.url);
	expected.id = expect.any(String);
	expected.dateCreated = expect.any(Number);
	expected.dateUpdated = expect.any(Number);
	expected.company.id = expect.any(String);
	expected.company.dateCreated = expect.any(Number);
	expected.company.dateUpdated = expect.any(Number);
	expected.status = expect.any(Number);
	sortApplicationComments([expected]);
	expected.comments.forEach((record) => {
		record.id = expect.any(String);
		record.applicationId = expected.id;
		record.dateCreated = expect.any(Number);
		record.dateUpdated = expect.any(Number);
	});
	expected.links?.forEach((record) => {
		record.positionTitle = expect.any(String);
		record.dateApplied = expect.any(Number);
		record.status = expect.any(Number);
	});
	return expected;
}

function mockCompanyListExpected(viewModels: IApplicationViewModel[]): ModelInterface<CompanyFullViewModel>[] {
	return viewModels.map((viewModel) => {
		const { company, ...application } = mockApplicationExpected(viewModel);
		delete application.links;
		application.status = EnumApplicationStatus.CurrentWeek;
		return {
			...company,
			applications: [application],
		};
	});
}

function sortApplicationComments(viewModels: IApplicationViewModel[] | ApplicationNestedViewModel[]) {
	viewModels.forEach((viewModel) => viewModel.comments.sort((lhs, rhs) => lhs.comment.localeCompare(rhs.comment)));
}

describe("Jobs e2e", async () => {
	const applicationViewModel = mockApplicationCreate();
	const applicationViewModel2 = mockApplicationCreate();
	let expected = mockApplicationExpected(applicationViewModel);
	let expected2: IApplicationViewModel;
	let applicationId: string;
	let applicationId2: string;
	let companyId: string;
	let companyId2: string;
	let app: INestApplication;
	const sequelize = new Sequelize({
		storage: ":memory:",
		dialect: SqliteDialect,
		models: AllModels,
		pool: {
			idle: Infinity,
			max: 1,
		},
	});

	await sequelize.sync();

	beforeEach(async () => {
		configDotenv({
			path: [".env.prod", ".env"],
		});
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				JobsModule,
				AuthModule,
			],
		}).overrideProvider(AuthGuard).useClass(AuthGuardTest).compile();
		app = module.createNestApplication();
		await app.init();
	});

	afterAll(() => sequelize.close());

	it("app should be defined", () => {
		expect(app).toBeDefined();
	});

	it("GET Companies (0)", async () => {
		const response = await request(app.getHttpServer()).get("/jobs/companies");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(0);
		expect(response.body.data).toStrictEqual([]);
	});

	it("GET Applications (0)", async () => {
		const response = await request(app.getHttpServer()).post("/jobs/applications/list");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(0);
		expect(response.body.data).toStrictEqual([]);
	});

	it("POST Application 1", async () => {
		const response = await request(app.getHttpServer()).post("/jobs/applications").send(applicationViewModel);
		applicationId = response.body.id;
		companyId = response.body.company.id;
		expect(response.status).toStrictEqual(HttpStatus.CREATED);
		sortApplicationComments([response.body]);
		expect(response.body).toStrictEqual(expected);
	});

	it("GET Application 1", async () => {
		const response = await request(app.getHttpServer()).get(`/jobs/applications/${applicationId}`);
		expect(response.status).toStrictEqual(HttpStatus.OK);
		sortApplicationComments([response.body]);
		expect(response.body).toStrictEqual(expected);
	});

	it("GET Companies 1", async () => {
		const response = await request(app.getHttpServer()).get("/jobs/companies");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(1);
		expect(response.body.data).toStrictEqual([expected.company]);
	});

	it("GET Companies List", async () => {
		const expected = mockCompanyListExpected([applicationViewModel]);
		const response = await request(app.getHttpServer()).post("/jobs/companies/list");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(1);
		(response.body.data as CompanyFullViewModel[]).forEach(({ applications }) => sortApplicationComments(applications));
		expect(response.body.data).toStrictEqual(expected);
	});

	it("GET Applications 1", async () => {
		const response = await request(app.getHttpServer()).post("/jobs/applications/list");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(1);
		expect(response.body.data.length).toStrictEqual(1);
		expect(response.body.data[0]).toBeDefined();
	});

	it("POST Application 2", async () => {
		applicationViewModel2.links = [{
			id: applicationId,
			type: EnumLinkType.To,
		}];
		expected2 = mockApplicationExpected(applicationViewModel2);
		const response = await request(app.getHttpServer()).post("/jobs/applications").send(applicationViewModel2);
		applicationId2 = response.body.id;
		companyId2 = response.body.company.id;
		expect(response.status).toStrictEqual(HttpStatus.CREATED);
		sortApplicationComments([response.body]);
		expect(response.body).toStrictEqual(expected2);
	});

	it("GET Application 1 (Links Changed)", async () => {
		const response = await request(app.getHttpServer()).get(`/jobs/applications/${applicationId}`);
		expect(response.status).toStrictEqual(HttpStatus.OK);
		sortApplicationComments([response.body]);
		expect(response.body.links.length).toStrictEqual(1);
		// Our data has changed now because the links have been added through Application 2, so let's update
		applicationViewModel.links = response.body.links;
		expected = mockApplicationExpected(applicationViewModel);
		expect(response.body).toStrictEqual(expected);
	});

	it("PUT Application 1", async () => {
		applicationViewModel.positionTitle = faker.person.jobTitle();
		applicationViewModel.url = faker.internet.url();
		// Update a comment
		applicationViewModel.comments[0].comment = faker.lorem.paragraphs();
		// Create AND Delete previous comment
		applicationViewModel.comments[1] = {
			comment: faker.lorem.paragraphs(),
			userId: TestUser.user_id,
		};
		// Our data has changed, so we have to update the expectation
		expected = mockApplicationExpected(applicationViewModel);
		const response = await request(app.getHttpServer()).put(`/jobs/applications/${applicationId}`).send(applicationViewModel);
		expect(response.status).toStrictEqual(HttpStatus.OK);
		sortApplicationComments([response.body]);
		expect(response.body).toStrictEqual(expected);
	});

	it("GET Applications 1 & 2", async () => {
		const response = await request(app.getHttpServer()).post("/jobs/applications/list");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(2);
		sortApplicationComments(response.body.data);
		expect(response.body.data).toStrictEqual([expected, expected2]);
	});

	it("DELETE Application 1", async () => {
		const response = await request(app.getHttpServer()).delete(`/jobs/applications/${applicationId}`);
		expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
		expect(response.body).toStrictEqual({});
	});

	it("GET Companies 1 & 2", async () => {
		const response = await request(app.getHttpServer()).get("/jobs/companies");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(2);
		expect(response.body.data).toStrictEqual([expected.company, expected2.company]);
	});

	it("GET 404 Application 1", async () => {
		const response = await request(app.getHttpServer()).get(`/jobs/applications/${applicationId}`);
		expect(response.status).toStrictEqual(HttpStatus.NOT_FOUND);
		expect(response.body.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
	});

	it("GET Applications 2", async () => {
		const { body, status } = await request(app.getHttpServer()).post("/jobs/applications/list");
		expect(status).toStrictEqual(HttpStatus.OK);
		expect(body.total).toStrictEqual(1);
		sortApplicationComments(body.data);
		expect(body.data[0].links).toStrictEqual([]);
		// The links have been removed through Application 1, so update accordingly
		expected2.links = body.data[0].links;
		expect(body.data).toStrictEqual([expected2]);
	});

	it("DELETE Company 1", async () => {
		const response = await request(app.getHttpServer()).delete(`/jobs/companies/${companyId}`);
		expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
		expect(response.body).toStrictEqual({});
	});

	it("GET Companies 2", async () => {
		const response = await request(app.getHttpServer()).get("/jobs/companies");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(1);
		expect(response.body.data).toStrictEqual([expected2.company]);
	});

	it("DELETE Application 1", async () => {
		const response = await request(app.getHttpServer()).delete(`/jobs/applications/${applicationId2}`);
		expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
		expect(response.body).toStrictEqual({});
	});

	it("GET 404 Application 2", async () => {
		const response = await request(app.getHttpServer()).get(`/jobs/applications/${applicationId2}`);
		expect(response.status).toStrictEqual(HttpStatus.NOT_FOUND);
		expect(response.body.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
	});

	it("DELETE Company 2", async () => {
		const response = await request(app.getHttpServer()).delete(`/jobs/companies/${companyId2}`);
		expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
		expect(response.body).toStrictEqual({});
	});

	it("GET Companies (0)", async () => {
		const response = await request(app.getHttpServer()).get("/jobs/companies");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(0);
		expect(response.body.data).toStrictEqual([]);
	});

	afterAll(async () => app.close());
});
