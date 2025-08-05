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
import { accessToken, expiresAt, mockedAxios, refreshToken } from "@/__mocks__/axios";
import {
	getActionTypes,
	getActivity1,
	getActivity1Update,
	getActivity2,
	getActivity2Update, getActivityAttributeTypes, getAttributeType1, getRoutine1,
	getRoutine1Update,
	getRoutine2, getRoutine2Update,
	importToCSV,
	IRoutineViewModel,
	mockActivityExpected,
	mockActivityStravaExpected,
	mockActivityTypeExpected, mockAttributeTypeExpected,
	mockAttributeTypesExpected,
	mockAttributeTypesListExpected,
	mockRoutineExpected,
	mockStravaImportExpected,
	sortViewModelProperties,
	stravaActivities, stravaImports, useMockedStravaAPI,
} from "@/__mocks__/exercises";
import { useSequelizeTest } from "@/__mocks__/sequelize";
import { AuthGuard } from "@/auth/auth.guard";
import { AuthModule } from "@/auth/auth.module";
import { EnumFeatures } from "@/constants";
import { ExercisesModule } from "@/exercises/exercises.module";
import { IActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { IAttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

describe("Exercises e2e", async () => {
	let app: INestApplication;
	let activity1: IActivityViewModel;
	let activity2: IActivityViewModel;
	let activity1Update: IActivityViewModel;
	let activity2Update: IActivityViewModel;
	let routine1: IRoutineViewModel;
	let routine2: IRoutineViewModel;
	let routine1Update: IRoutineViewModel;
	let routine2Update: IRoutineViewModel;
	let attributeType1: IAttributeTypeViewModel;
	const sequelize = await useSequelizeTest();

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
		mockedAxios.mockClear();
	});

	afterAll(() => {
		sequelize.close();
	});

	it("app should be defined", () => expect(app).toBeDefined());

	describe("Activities", async () => {
		it("LIST Activities 0", async () => {
			const response = await request(app.getHttpServer()).post("/exercises/activities/list");
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(0);
			expect(response.body.data).toStrictEqual([]);
		});

		it("POST Activity 1", async () => {
			const viewModel = getActivity1();
			const expected = mockActivityExpected(viewModel);
			const response = await request(app.getHttpServer()).post("/exercises/activities").send(viewModel);
			sortViewModelProperties(response.body);
			expect(response.status).toStrictEqual(HttpStatus.CREATED);
			expect(response.body).toStrictEqual(expected);
			// Store, so we have proper IDs and whatnot
			activity1 = response.body;
		});

		it("GET Activity 1", async () => {
			const response = await request(app.getHttpServer()).get(`/exercises/activities/${activity1.id}`);
			sortViewModelProperties(response.body);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(mockActivityExpected(activity1));
		});

		it("POST Activity 2", async () => {
			const viewModel = getActivity2();
			const expected = mockActivityExpected(viewModel);
			const response = await request(app.getHttpServer()).post("/exercises/activities").send(viewModel);
			sortViewModelProperties(response.body);
			expect(response.status).toStrictEqual(HttpStatus.CREATED);
			expect(response.body).toStrictEqual(expected);
			// Store, so we have proper IDs and whatnot
			activity2 = response.body;
		});

		it("LIST Activities 1 & 2", async () => {
			const response = await request(app.getHttpServer()).post("/exercises/activities/list");
			response.body.data.forEach((viewModel: IActivityViewModel) => sortViewModelProperties(viewModel));
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(2);
			expect(response.body.data).toStrictEqual([mockActivityExpected(activity1), mockActivityExpected(activity2)]);
		});

		it("PUT Activity 1 (CUD actions and attributes)", async () => {
			const viewModel = getActivity1Update(activity1);
			const expected = mockActivityExpected(viewModel);
			// This attribute will be assigned a new ID, but we still want to send the old ID in the viewModel to see that it has been changed
			expected.attributes![0].attributeType!.id = expect.not.stringContaining(viewModel.attributes![0].attributeType!.id!);
			const response = await request(app.getHttpServer()).put(`/exercises/activities/${activity1.id}`).send(viewModel);
			sortViewModelProperties(response.body);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
			activity1Update = response.body;
		});

		it("PUT Activity 2 (change everything, except the ID)", async () => {
			// Basically changing everything
			const viewModel = getActivity2Update();
			viewModel.id = activity2.id;
			const expected = mockActivityExpected(viewModel);
			const response = await request(app.getHttpServer()).put(`/exercises/activities/${viewModel.id}`).send(viewModel);
			sortViewModelProperties(response.body);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
			activity2Update = response.body;
		});

		it("GET Activity 2", async () => {
			const response = await request(app.getHttpServer()).get(`/exercises/activities/${activity2Update.id}`);
			sortViewModelProperties(response.body);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(mockActivityExpected(activity2Update));
		});

		it("GET Activity Types", async () => {
			const response = await request(app.getHttpServer()).get("/exercises/activities/activity-types");
			expect(response.status).toStrictEqual(HttpStatus.OK);
			// We expect 3 here because we originally created 2, and then created a brand new one in the 2nd PUT
			expect(response.body).toStrictEqual([
				mockActivityTypeExpected(activity1Update.activityType!),
				mockActivityTypeExpected(activity2.activityType!),
				mockActivityTypeExpected(activity2Update.activityType!),
			]);
		});

		it("DELETE Activity 1", async () => {
			const response = await request(app.getHttpServer()).delete(`/exercises/activities/${activity1Update.id}`);
			sortViewModelProperties(response.body);
			expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
			expect(response.body).toStrictEqual({});
		});

		it("GET 404 Activity 1", async () => {
			const response = await request(app.getHttpServer()).get(`/exercises/activities/${activity1Update.id}`);
			sortViewModelProperties(response.body);
			expect(response.status).toStrictEqual(HttpStatus.NOT_FOUND);
			expect(response.body.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
		});

		it("LIST Activities 2", async () => {
			const response = await request(app.getHttpServer()).post("/exercises/activities/list");
			response.body.data.forEach((viewModel: IActivityViewModel) => sortViewModelProperties(viewModel));
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(1);
			expect(response.body.data).toStrictEqual([mockActivityExpected(activity2Update)]);
		});

		it("DELETE Activity 2", async () => {
			const response = await request(app.getHttpServer()).delete(`/exercises/activities/${activity2Update.id}`);
			sortViewModelProperties(response.body);
			expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
			expect(response.body).toStrictEqual({});
		});

		it("GET 404 Activity 2", async () => {
			const response = await request(app.getHttpServer()).get(`/exercises/activities/${activity2Update.id}`);
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

		it("GET Action Types", async () => {
			const expected = getActionTypes([
				activity1,
				activity2,
				activity1Update,
				activity2Update,
				routine1,
				routine1Update,
				routine2,
				routine2Update,
			]);
			const response = await request(app.getHttpServer()).get("/exercises/action-types");
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
		});
	});

	describe("Routines", async () => {
		it("GET Routines 0", async () => {
			const response = await request(app.getHttpServer()).get("/exercises/routines");
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(0);
			expect(response.body.data).toStrictEqual([]);
		});

		it("CREATE Routine 1", async () => {
			const viewModel = getRoutine1();
			const expected = mockRoutineExpected(viewModel, true);
			const response = await request(app.getHttpServer()).post("/exercises/routines").send(viewModel);
			expect(response.status).toStrictEqual(HttpStatus.CREATED);
			expect(response.body).toStrictEqual(expected);
			routine1 = response.body;
		});

		it("GET Routines 1", async () => {
			const response = await request(app.getHttpServer()).get("/exercises/routines");
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(1);
			expect(response.body.data).toStrictEqual([mockRoutineExpected(routine1)]);
		});

		it("CREATE Routine 2", async () => {
			const viewModel = getRoutine2();
			const expected = mockRoutineExpected(viewModel, true);
			const response = await request(app.getHttpServer()).post("/exercises/routines").send(viewModel);
			expect(response.status).toStrictEqual(HttpStatus.CREATED);
			expect(response.body).toStrictEqual(expected);
			routine2 = response.body;
		});

		it("GET Routine 2", async () => {
			const response = await request(app.getHttpServer()).get(`/exercises/routines/${routine2.id}`);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(mockRoutineExpected(routine2));
		});

		it("UPDATE Routine 1", async () => {
			const viewModel = getRoutine1Update(routine1);
			const expected = mockRoutineExpected(viewModel);
			const response = await request(app.getHttpServer()).put(`/exercises/routines/${viewModel.id}`).send(viewModel);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
			routine1Update = response.body;
		});

		it("UPDATE Routine 2", async () => {
			const viewModel = getRoutine2Update();
			viewModel.id = routine2.id;
			const expected = mockRoutineExpected(viewModel);
			const response = await request(app.getHttpServer()).put(`/exercises/routines/${viewModel.id}`).send(viewModel);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
			routine2Update = response.body;
		});

		it("GET Routines 1 & 2", async () => {
			const response = await request(app.getHttpServer()).get("/exercises/routines");
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(2);
			expect(response.body.data).toStrictEqual([
				mockRoutineExpected(routine1Update),
				mockRoutineExpected(routine2Update),
			]);
		});

		it("GET Routine 1 Update", async () => {
			const response = await request(app.getHttpServer()).get(`/exercises/routines/${routine1Update.id}`);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(mockRoutineExpected(routine1Update));
		});

		it("DELETE Routine 1", async () => {
			const response = await request(app.getHttpServer()).delete(`/exercises/routines/${routine1Update.id}`);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual({});
		});

		it("GET 404 Routine 1", async () => {
			const response = await request(app.getHttpServer()).get(`/exercises/routines/${routine1Update.id}`);
			expect(response.status).toStrictEqual(HttpStatus.NOT_FOUND);
			expect(response.body.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
		});

		it("GET Routines 2", async () => {
			const response = await request(app.getHttpServer()).get("/exercises/routines");
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(1);
			expect(response.body.data).toStrictEqual([
				mockRoutineExpected(routine2Update),
			]);
		});

		it("DELETE Routine 2", async () => {
			const response = await request(app.getHttpServer()).delete(`/exercises/routines/${routine2Update.id}`);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual({});
		});

		it("GET 404 Routine 2", async () => {
			const response = await request(app.getHttpServer()).get(`/exercises/routines/${routine2Update.id}`);
			expect(response.status).toStrictEqual(HttpStatus.NOT_FOUND);
			expect(response.body.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
		});

		it("GET Routines 0", async () => {
			const response = await request(app.getHttpServer()).get("/exercises/routines");
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body.total).toStrictEqual(0);
			expect(response.body.data).toStrictEqual([]);
		});

		it("GET Action Types", async () => {
			const expected = getActionTypes([
				activity1,
				activity2,
				activity1Update,
				activity2Update,
				routine1,
				routine1Update,
				routine2,
				routine2Update,
			]);
			const response = await request(app.getHttpServer()).get("/exercises/action-types");
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
		});
	});

	describe("Strava", async () => {
		it("SYNC Strava", async () => {
			useMockedStravaAPI();
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

	describe("Attribute Types", async () => {
		let attributeTypeActivity = getActivity1();

		it("GET Attribute Types", async () => {
			const expected = mockAttributeTypesExpected([
				activity1,
				activity1Update,
				activity2,
				activity2Update,
			]);
			const response = await request(app.getHttpServer()).get("/attribute-types").query({
				feature: EnumFeatures.exercises,
			});
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
		});

		it("LIST Attribute Types With Only Strava Attributes Associated", async () => {
			const expected = mockAttributeTypesListExpected([
				...getActivityAttributeTypes(activity1),
				...getActivityAttributeTypes(activity1Update),
				...getActivityAttributeTypes(activity2),
				...getActivityAttributeTypes(activity2Update),
			]);
			const response = await request(app.getHttpServer()).post("/attribute-types/list").send({
				feature: EnumFeatures.all,
			});
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
		});

		it("GET Attribute Type", async () => {
			// First, let's create an activity, so we can tie it to an attribute type and test to make sure it returns
			const activityResponse = await request(app.getHttpServer()).post("/exercises/activities").send(attributeTypeActivity);
			attributeTypeActivity = activityResponse.body;

			const viewModel = getAttributeType1();
			viewModel.id = attributeTypeActivity.attributes![0].attributeType!.id;
			const expected = mockAttributeTypeExpected(viewModel);
			const response = await request(app.getHttpServer()).get(`/attribute-types/${viewModel.id}`);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
			attributeType1 = response.body;
		});

		it("UPDATE Attribute Type", async () => {
			const viewModel = attributeType1;
			viewModel.name += faker.string.uuid();
			const expected = mockAttributeTypeExpected(viewModel);
			const response = await request(app.getHttpServer()).put(`/attribute-types/${viewModel.id}`).send(viewModel);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);

			// Let's make sure we update our activity's attribute type's name
			const found = attributeTypeActivity.attributes?.find(({ attributeType }) => attributeType?.id === viewModel.id)?.attributeType;
			found!.name = viewModel.name;
		});

		it("LIST Attribute Types With Strava And 1 Updated Activity Attribute Associated", async () => {
			const expected = mockAttributeTypesListExpected([
				// This is the only activity that will have an associated attribute, so let's include it
				...getActivityAttributeTypes(attributeTypeActivity, true),
				...getActivityAttributeTypes(activity1),
				...getActivityAttributeTypes(activity1Update),
				...getActivityAttributeTypes(activity2),
				...getActivityAttributeTypes(activity2Update),
			]);
			const response = await request(app.getHttpServer()).post("/attribute-types/list").send({
				feature: EnumFeatures.all,
			});
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
		});

		it("DELETE Attribute Type", async () => {
			const response = await request(app.getHttpServer()).delete(`/attribute-types/${attributeType1.id}`);
			expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
			expect(response.body).toStrictEqual({});
		});

		it("GET 404 Attribute Type", async () => {
			const response = await request(app.getHttpServer()).get(`/attribute-types/${attributeType1.id}`);
			expect(response.status).toStrictEqual(HttpStatus.NOT_FOUND);
			expect(response.body.statusCode).toStrictEqual(HttpStatus.NOT_FOUND);
		});

		it("DELETE Attribute", async () => {
			const response = await request(app.getHttpServer()).delete(`/attributes/${attributeTypeActivity.attributes![1].id}`);
			expect(response.status).toStrictEqual(HttpStatus.NO_CONTENT);
			expect(response.body).toStrictEqual({});
		});

		// When we delete an attribute type, it wipes all the attribute associations
		it("GET Activity Without Deleted Attribute", async () => {
			// The first 2 attributes were deleted... one through deleting attribute type, and the other by deleting the attribute
			attributeTypeActivity.attributes!.splice(0, 2);
			const expected = mockActivityExpected(attributeTypeActivity);
			const response = await request(app.getHttpServer()).get(`/exercises/activities/${attributeTypeActivity.id}`);
			expect(response.status).toStrictEqual(HttpStatus.OK);
			expect(response.body).toStrictEqual(expected);
		});
	});
});
