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
import { EnumFeatures, EnumUnitTypes } from "@/constants";
import { AllModels } from "@/db/models";
import { ExercisesModule } from "@/exercises/exercises.module";
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

function mockActivity(): IActivityViewModel {
	const actions: IActivityActionViewModel[] = [];
	const attributes: IActivityAttributeViewModel[] = [];

	for (let i = 0; i < 3; i++) {
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

describe("Exercises e2e", async () => {
	let app: INestApplication;
	const viewModels: IActivityViewModel[] = [mockActivity(), mockActivity()];
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

	afterAll(() => sequelize.close());

	it("app should be defined", () => expect(app).toBeDefined());

	it("GET Activities (0)", async () => {
		const response = await request(app.getHttpServer()).post("/exercises/activities/list");
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(0);
		expect(response.body.data).toStrictEqual([]);
	});

	it("POST Activity 1", async () => {
		const viewModel = viewModels[0];
		const expected = mockActivityExpected(viewModel);
		const response = await request(app.getHttpServer()).post("/exercises/activities").send(viewModel);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.CREATED);
		expect(response.body).toStrictEqual(expected);
		// Update our viewModel, as it now contains properly stubbed data (including IDs)
		viewModels[0] = response.body;
	});

	it("POST Activity 2", async () => {
		const viewModel = viewModels[1];
		const expected = mockActivityExpected(viewModel);
		const response = await request(app.getHttpServer()).post("/exercises/activities").send(viewModel);
		// Let's store the ID that gets created
		viewModel.id = response.body.id;
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.CREATED);
		expect(response.body).toStrictEqual(expected);
		// Update our viewModel, as it now contains properly stubbed data (including IDs)
		viewModels[1] = response.body;
	});

	it("GET Activities 1 & 2", async () => {
		const response = await request(app.getHttpServer()).post("/exercises/activities/list");
		response.body.data.forEach((viewModel: IActivityViewModel) => sortViewModelProperties(viewModel));
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body.total).toStrictEqual(2);
		expect(response.body.data).toStrictEqual(viewModels.map((viewModel) => mockActivityExpected(viewModel)));
	});

	it("PUT Activity 1 (CUD actions and attributes)", async () => {
		const viewModel = viewModels[0];
		const { actions = [], attributes = [] } = viewModel;
		// Delete the 2nd action
		actions.splice(1, 1);
		// Update 1st action
		actions[0].value = faker.word.adverb();
		// Create
		actions.push(mockAction(2));

		// // Delete 1st + 3rd attributes
		attributes.splice(0, 1);
		attributes.splice(2, 1);
		// Update 2nd (now 1st) attribute
		attributes[0].value = faker.number.float({
			min: 1,
			max: 200,
		}).toString();
		// Create a brand new attributeType
		attributes[0].attributeType.name = faker.word.noun();
		const attributeTypeViewModel = structuredClone(attributes[0].attributeType);
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
		viewModels[0] = response.body;
	});

	it("PUT Activity 2 (change everything, except the ID)", async () => {
		// Basically changing everything
		const viewModel = mockActivity();
		viewModel.id = viewModels[1].id;
		const expected = mockActivityExpected(viewModel);
		const response = await request(app.getHttpServer()).put(`/exercises/activities/${viewModel.id}`).send(viewModel);
		sortViewModelProperties(response.body);
		expect(response.status).toStrictEqual(HttpStatus.OK);
		expect(response.body).toStrictEqual(expected);
	});
});
