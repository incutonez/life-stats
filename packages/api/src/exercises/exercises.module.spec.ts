import { faker } from "@faker-js/faker";
import { HttpStatus, INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import axios from "axios";
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
import { TestUser } from "@/__mocks__/users";
import { AuthGuard } from "@/auth/auth.guard";
import { AuthModule } from "@/auth/auth.module";
import { EnumFeatures, EnumUnitTypes } from "@/constants";
import { AllModels } from "@/db/models";
import { EnumActivitySource } from "@/exercises/constants";
import { ExercisesModule } from "@/exercises/exercises.module";
import { IStravaActivity } from "@/exercises/types";
import { IActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";
import { IActionViewModel } from "@/exercises/viewModels/action.viewmodel";
import { ActivityActionViewModel } from "@/exercises/viewModels/activity.action.viewmodel";
import { IActivityAttributeViewModel } from "@/exercises/viewModels/activity.attribute.viewmodel";
import { IActivityTypeViewModel } from "@/exercises/viewModels/activity.type.viewmodel";
import { IActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { ModelInterface } from "@/types";
import { genericSort, roundTo } from "@/utils";
import { IAttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

type IActivityActionViewModel = ModelInterface<ActivityActionViewModel>;

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

function mockActivity(): IActivityViewModel {
	const actions: IActivityActionViewModel[] = [];
	const attributes: IActivityAttributeViewModel[] = [];

	for (let i = 0; i < 4; i++) {
		actions.push(mockAction(i));
	}

	for (let i = 0; i < 4; i++) {
		attributes.push(mockAttribute());
	}

	return {
		actions,
		attributes,
		title: faker.word.words(),
		dateOccurred: faker.date.anytime().getTime(),
		weight: faker.number.float({
			min: 60,
			max: 300,
		}),
		duration: faker.number.float({
			min: 0.5,
			max: 24,
		}),
		description: faker.lorem.paragraphs(),
		activityType: mockActivityType(),
	};
}

function mockActivityType(): IActivityTypeViewModel {
	return {
		name: faker.word.verb(),
	};
}

function mockAction(order = faker.number.int()): IActivityActionViewModel {
	return {
		order,
		value: faker.word.adverb(),
		actionType: mockActionType(),
	};
}

function mockActionType(): IActionTypeViewModel {
	return {
		name: faker.word.verb(),
	};
}

function mockAttribute(): IActivityAttributeViewModel {
	return {
		unit: EnumUnitTypes.Miles,
		value: faker.number.float({
			min: 1,
			max: 20,
		}).toString(),
		attributeType: mockAttributeType(),
	};
}

function mockAttributeType(): IAttributeTypeViewModel {
	return {
		name: faker.word.noun(),
	};
}

function mockActivityStrava(): IStravaActivity {
	const moving_time = faker.number.float({
		min: 240,
		max: 1000,
	});
	return {
		moving_time,
		type: faker.word.verb(),
		elapsed_time: faker.number.float({
			min: moving_time,
			max: moving_time + 100,
		}),
		distance: faker.number.float({
			min: 240,
			max: 1000,
		}),
		max_speed: faker.number.float({
			min: 240,
			max: 1000,
		}),
		average_speed: faker.number.float({
			min: 240,
			max: 1000,
		}),
		start_date: faker.date.past().toString(),
		id: faker.number.int(),
		name: faker.word.words(),
		// Unused but implemented
		achievement_count: 0,
		athlete: {
			id: 0,
			resource_state: 0,
		},
		athlete_count: 0,
		average_cadence: 0,
		average_heartrate: 0,
		average_watts: 0,
		comment_count: 0,
		commute: false,
		device_watts: false,
		external_id: "",
		flagged: false,
		from_accepted_tag: false,
		gear_id: "",
		has_heartrate: false,
		has_kudoed: false,
		kilojoules: 0,
		kudos_count: 0,
		location_country: "",
		manual: false,
		map: {
			id: "",
			resource_state: 0,
		},
		max_heartrate: 0,
		max_watts: 0,
		photo_count: 0,
		pr_count: 0,
		private: false,
		resource_state: 0,
		sport_type: "",
		start_date_local: "",
		suffer_score: 0,
		timezone: "",
		total_elevation_gain: 0,
		total_photo_count: 0,
		trainer: false,
		upload_id: 0,
		utc_offset: 0,
		weighted_average_watts: 0,
	};
}

function mockActivityStravaExpected(model: IStravaActivity) {
	const viewModel: IActivityViewModel = {
		id: expect.any(String),
		source: EnumActivitySource.Strava,
		sourceId: model.id.toString(),
		title: model.name,
		calories: expect.any(Number),
		dateCreated: expect.any(Number),
		dateUpdated: expect.any(Number),
		duration: expect.any(Number),
		weight: 200,
		weightLost: expect.any(Number),
		userId: TestUser.user_id,
		dateOccurred: new Date(model.start_date).getTime(),
		activityType: {
			id: expect.any(String),
			name: model.type,
		},
		actions: [],
		attributes: [{
			id: expect.any(String),
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: expect.any(String),
				name: "Duration Total",
				feature: EnumFeatures.exercises,
			},
		}, {
			id: expect.any(String),
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: expect.any(String),
				name: "Distance",
				feature: EnumFeatures.exercises,
			},
		}, {
			id: expect.any(String),
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: expect.any(String),
				name: "Speed Max",
				feature: EnumFeatures.exercises,
			},
		}, {
			id: expect.any(String),
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: expect.any(String),
				name: "Speed Average",
				feature: EnumFeatures.exercises,
			},
		}],
	};
	sortViewModelProperties(viewModel);
	return viewModel;
}

function mockBaseExpected<T>(viewModel: T, includeDates = false): T {
	const expected = structuredClone<any>(viewModel);
	/* We use ||= here because when we finally set the ID, we actually want to make sure it's the same... this really only
	 * matters on the initial creation */
	expected.id ||= expect.any(String);
	if (includeDates) {
		expected.dateCreated ||= expect.any(Number);
		expected.dateUpdated ||= expect.any(Number);
	}
	return expected;
}

function mockActivityExpected(viewModel: IActivityViewModel): IActivityViewModel {
	const expected = mockBaseExpected(viewModel, true);
	expected.userId = TestUser.user_id;
	expected.calories = expect.any(Number);
	expected.weightLost = expect.any(Number);
	expected.activityType = mockActivityTypeExpected(expected.activityType);
	// Actions are sorted by the order property by default
	expected.actions = sortActions(expected.actions?.map((action) => mockActionExpected(action)));
	expected.attributes = expected.attributes?.map((attribute) => mockAttributeExpected(attribute));
	sortViewModelProperties(expected);
	return expected;
}

function mockActivityTypeExpected(viewModel: IActivityTypeViewModel) {
	return mockBaseExpected(viewModel);
}

function mockActionExpected(viewModel: IActivityActionViewModel) {
	const expected = mockBaseExpected(viewModel);
	expected.actionType = mockActionTypeExpected(expected.actionType);
	return expected;
}

function mockActionTypeExpected(viewModel: IActionTypeViewModel) {
	return mockBaseExpected(viewModel);
}

function mockAttributeTypeExpected(viewModel: IAttributeTypeViewModel) {
	const expected = mockBaseExpected(viewModel);
	expected.feature = EnumFeatures.exercises;
	return expected;
}

function mockAttributeExpected(viewModel: IActivityAttributeViewModel) {
	const expected = mockBaseExpected(viewModel);
	// The API returns our value rounded to 4 decimal places
	expected.value = roundTo(parseFloat(expected.value)).toString();
	expected.attributeType = mockAttributeTypeExpected(expected.attributeType);
	return expected;
}

function sortActions(actions?: IActionViewModel[]) {
	actions?.sort((lhs, rhs) => genericSort(lhs.order, rhs.order));
	return actions;
}

function sortViewModelProperties(viewModel: IActivityViewModel) {
	viewModel.attributes?.sort((lhs, rhs) => genericSort(lhs.attributeType.name, rhs.attributeType.name));
}

function getLatest(viewModels: IActivityViewModel[]) {
	return viewModels[viewModels.length - 1];
}

function getLatestExpected(viewModels: IActivityViewModel[]) {
	return mockActivityExpected(getLatest(viewModels));
}

describe("Exercises e2e", async () => {
	let app: INestApplication;
	const viewModel1: IActivityViewModel[] = [];
	const viewModel2: IActivityViewModel[] = [];
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
		const accessToken = faker.internet.jwt();
		const refreshToken = faker.internet.jwt();
		const expiresAt = faker.date.future().getTime();
		const stravaActivities = [
			mockActivityStrava(),
			mockActivityStrava(),
			mockActivityStrava(),
			mockActivityStrava(),
			mockActivityStrava(),
		];
		mockedAxios.request.mockImplementation(({ url }) => {
			if (url === "https://www.strava.com/oauth/token") {
				return Promise.resolve({
					data: {
						access_token: accessToken,
						refresh_token: refreshToken,
						expires_at: expiresAt,
					},
				});
			}
			else if (url === "https://www.strava.com/api/v3/athlete/activities") {
				return Promise.resolve({
					data: stravaActivities,
				});
			}
			return Promise.resolve({
				data: [],
			});
		});

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
	});
});
