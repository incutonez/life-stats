import { faker } from "@faker-js/faker";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { configDotenv } from "dotenv";
import request from "supertest";
import {
	afterAll, afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import { AuthGuardTest } from "@/__mocks__/auth.guard.test";
import { accessToken, expiresAt, refreshToken } from "@/__mocks__/axios";
import {
	getLatest, getLatestExpected,
	importToCSV, mockAction, mockActivity, mockActivityExpected,
	mockActivityStravaExpected, mockActivityTypeExpected, mockAttribute,
	mockStravaImport, mockStravaImportExpected,
	sortViewModelProperties, stravaActivities,
} from "@/__mocks__/exercises";
import { sequelize } from "@/__mocks__/sequelize";
import { AuthGuard } from "@/auth/auth.guard";
import { AuthModule } from "@/auth/auth.module";
import { ExercisesModule } from "@/exercises/exercises.module";
import { IActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";

describe("Exercises e2e", async () => {
	let app: INestApplication;
	const viewModel1: IActivityViewModel[] = [];
	const viewModel2: IActivityViewModel[] = [];

	await sequelize.sync();

	beforeEach(async () => {
		configDotenv({
			path: [".env.prod", ".env"],
		});
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ExercisesModule,
				AuthModule,
			],
		}).overrideProvider(AuthGuard).useClass(AuthGuardTest).compile();
		app = module.createNestApplication();
		await app.init();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	afterAll(() => {
		sequelize.close();
	});

	it("app should be defined", () => expect(app).toBeDefined());

	it("LIST Activities 0", async () => {
		const response = await request(app.getHttpServer()).post("/exercises/activities/list");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(0);
		expect(response.body.data).toStrictEqual([]);
	});

	it("POST Activity 1", async () => {
		const viewModel = mockActivity();
		const expected = mockActivityExpected(viewModel);
		const response = await request(app.getHttpServer()).post("/exercises/activities").send(viewModel);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.CREATED);
		expect(response.body).toStrictEqual(expected);
		// Update our viewModel, as it now contains properly stubbed data (including IDs)
		viewModel1.push(response.body);
	});

	it("GET Activity 1", async () => {
		const viewModel = getLatest(viewModel1);
		const response = await request(app.getHttpServer()).get(`/exercises/activities/${viewModel.id}`);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body).toStrictEqual(getLatestExpected(viewModel1));
	});

	it("POST Activity 2", async () => {
		const viewModel = mockActivity();
		const expected = mockActivityExpected(viewModel);
		const response = await request(app.getHttpServer()).post("/exercises/activities").send(viewModel);
		// Let's store the ID that gets created
		viewModel.id = response.body.id;
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.CREATED);
		expect(response.body).toStrictEqual(expected);
		// Update our viewModel, as it now contains properly stubbed data (including IDs)
		viewModel2.push(response.body);
	});

	it("LIST Activities 1 & 2", async () => {
		const response = await request(app.getHttpServer()).post("/exercises/activities/list");
		response.body.data.forEach((viewModel: IActivityViewModel) => sortViewModelProperties(viewModel));
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(2);
		expect(response.body.data).toStrictEqual([getLatestExpected(viewModel1), getLatestExpected(viewModel2)]);
	});

	it("PUT Activity 1 (CUD actions and attributes)", async () => {
		const viewModel = getLatest(viewModel1);
		const { actions = [], attributes = [] } = viewModel;
		// Delete the 2nd action
		actions.splice(1, 1);
		// Update 1st action
		actions[0].value = faker.word.adverb();
		// 3rd (now 2nd) action remains unchanged
		// Create
		actions.push(mockAction(2));

		// // Delete 3rd attribute
		attributes.splice(2, 1);
		// Update 2nd (now 1st) attribute
		attributes[0].value = faker.number.float({
			min: 1,
			max: 200,
		}).toString();
		// Create a brand new attributeType
		attributes[0].attributeType.name = faker.word.noun();
		const attributeTypeViewModel = structuredClone(attributes[0].attributeType);
		// 2nd attribute remains unchanged
		attributes.push(mockAttribute());

		const expected = mockActivityExpected(viewModel);
		const foundExpected = expected.attributes!.find((attribute) => attribute.attributeType.name === attributeTypeViewModel.name)!;
		// This attribute will be assigned a new ID, but we still want to send the old ID in the viewModel to see that it has been changed
		foundExpected.attributeType.id = expect.any(String);
		const response = await request(app.getHttpServer()).put(`/exercises/activities/${viewModel.id}`).send(viewModel);
		sortViewModelProperties(response.body);
		const found = (response.body as IActivityViewModel).attributes!.find((attribute) => attribute.attributeType.name === attributeTypeViewModel.name)!;
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body).toStrictEqual(expected);
		expect(found.attributeType.id).not.toStrictEqual(attributeTypeViewModel.id);
		// Update our viewModel, as it now contains properly stubbed data (including IDs)
		viewModel1.push(response.body);
	});

	it("PUT Activity 2 (change everything, except the ID)", async () => {
		// Basically changing everything
		const viewModel = mockActivity();
		viewModel.id = getLatest(viewModel2).id;
		const expected = mockActivityExpected(viewModel);
		const response = await request(app.getHttpServer()).put(`/exercises/activities/${viewModel.id}`).send(viewModel);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body).toStrictEqual(expected);
		// Update our viewModel, as it now contains properly stubbed data (including IDs)
		viewModel2.push(response.body);
	});

	it("GET Activity 2", async () => {
		const viewModel = getLatest(viewModel2);
		const response = await request(app.getHttpServer()).get(`/exercises/activities/${viewModel.id}`);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body).toStrictEqual(getLatestExpected(viewModel2));
	});

	it("GET Activity Types", async () => {
		const response = await request(app.getHttpServer()).get("/exercises/activities/activity-types");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		// We expect 3 here because we originally created 2, and then created a brand new one in the 2nd PUT
		expect(response.body).toStrictEqual([
			mockActivityTypeExpected(getLatest(viewModel1).activityType),
			mockActivityTypeExpected(viewModel2[0].activityType),
			mockActivityTypeExpected(getLatest(viewModel2).activityType),
		]);
	});

	it("DELETE Activity 1", async () => {
		const viewModel = getLatest(viewModel1);
		const response = await request(app.getHttpServer()).delete(`/exercises/activities/${viewModel.id}`);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
		expect(response.body).toStrictEqual({});
	});

	it("GET 404 Activity 1", async () => {
		const viewModel = getLatest(viewModel1);
		const response = await request(app.getHttpServer()).get(`/exercises/activities/${viewModel.id}`);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.NOT_FOUND);
		expect(response.body.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
	});

	it("LIST Activities 2", async () => {
		const response = await request(app.getHttpServer()).post("/exercises/activities/list");
		response.body.data.forEach((viewModel: IActivityViewModel) => sortViewModelProperties(viewModel));
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(1);
		expect(response.body.data).toStrictEqual([getLatestExpected(viewModel2)]);
	});

	it("DELETE Activity 2", async () => {
		const viewModel = getLatest(viewModel2);
		const response = await request(app.getHttpServer()).delete(`/exercises/activities/${viewModel.id}`);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
		expect(response.body).toStrictEqual({});
	});

	it("GET 404 Activity 2", async () => {
		const viewModel = getLatest(viewModel2);
		const response = await request(app.getHttpServer()).get(`/exercises/activities/${viewModel.id}`);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.NOT_FOUND);
		expect(response.body.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
	});

	it("LIST Activities 0", async () => {
		const response = await request(app.getHttpServer()).post("/exercises/activities/list");
		response.body.data.forEach((viewModel: IActivityViewModel) => sortViewModelProperties(viewModel));
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(0);
		expect(response.body.data).toStrictEqual([]);
	});

	describe("Strava", async () => {
		const stravaImports = [
			mockStravaImport(),
			mockStravaImport(),
			mockStravaImport(),
			mockStravaImport(),
			mockStravaImport(),
		];

		it("SYNC Strava", async () => {
			const response = await request(app.getHttpServer()).post("/exercises/activities/strava/sync").send({
				accessToken: faker.internet.jwt(),
			});
			expect(response.status).toStrictEqual(HttpStatus.CREATED);
			expect(response.body.successful).toStrictEqual(5);
			expect(response.body.errors).toStrictEqual([]);
			expect(response.body.accessToken).toStrictEqual(accessToken);
			expect(response.body.refreshToken).toStrictEqual(refreshToken);
			expect(response.body.expirationDate).toStrictEqual(expiresAt);
		});

		it("LIST Activities 5", async () => {
			const expected = stravaActivities.map((activity) => mockActivityStravaExpected(activity));
			const response = await request(app.getHttpServer()).post("/exercises/activities/list");
			response.body.data.forEach((viewModel: IActivityViewModel) => sortViewModelProperties(viewModel));
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(5);
			expect(response.body.data).toStrictEqual(expected);
		});

		it("IMPORT then UPLOAD Strava", async () => {
			const file = await new File([stravaImports.map((model) => importToCSV(model)).join("\n")], "import.csv", {
				type: "text/csv",
			}).arrayBuffer();
			const expected = stravaImports.map((model) => mockStravaImportExpected(model));
			const importResponse = await request(app.getHttpServer()).post("/exercises/activities/strava/import")
				.set("Content-type", "multipart/form-data")
				.field("addHeaders", "true")
				.attach("file", Buffer.from(file), {
					filename: "import.csv",
					contentType: "text/csv",
				});
			importResponse.body.forEach((record: IActivityViewModel) => sortViewModelProperties(record));
			expect(importResponse.status).toStrictEqual(HttpStatus.OK);
			expect(importResponse.body).toStrictEqual(expected);

			// Begin actual upload
			const response = await request(app.getHttpServer()).post("/exercises/activities/strava/upload")
				.send(importResponse.body);
			expect(response.status).toStrictEqual(HttpStatus.CREATED);
			expect(response.body.successful).toStrictEqual(5);
			expect(response.body.errors).toStrictEqual([]);
		});

		it("LIST Activities 10", async () => {
			const expected = [
				...stravaActivities.map((activity) => mockActivityStravaExpected(activity)),
				...stravaImports.map((model) => mockStravaImportExpected(model, true)),
			];
			const response = await request(app.getHttpServer()).post("/exercises/activities/list");
			response.body.data.forEach((viewModel: IActivityViewModel) => sortViewModelProperties(viewModel));
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(10);
			expect(response.body.data).toStrictEqual(expected);
		});
	});
});
