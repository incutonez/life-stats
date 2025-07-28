import { faker } from "@faker-js/faker";
import { expect } from "vitest";
import { TestUser } from "@/__mocks__/users";
import { EnumFeatures, EnumUnitTypes } from "@/constants";
import { EnumActivitySource } from "@/exercises/constants";
import { IStravaActivity, IStravaImport } from "@/exercises/types";
import { IActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";
import { ActivityActionViewModel } from "@/exercises/viewModels/activity.action.viewmodel";
import { IActivityAttributeViewModel } from "@/exercises/viewModels/activity.attribute.viewmodel";
import { IActivityTypeViewModel } from "@/exercises/viewModels/activity.type.viewmodel";
import { IActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { ModelInterface } from "@/types";
import { dateToUTC, genericSort, roundTo } from "@/utils";
import { IAttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

type IActivityActionViewModel = ModelInterface<ActivityActionViewModel>;

export const stravaActivities = [
	mockActivityStrava(),
	mockActivityStrava(),
	mockActivityStrava(),
	mockActivityStrava(),
	mockActivityStrava(),
];

export function mockActivity(): IActivityViewModel {
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

export function mockActivityType(): IActivityTypeViewModel {
	return {
		name: faker.word.verb(),
	};
}

export function mockAction(order = faker.number.int()): IActivityActionViewModel {
	return {
		order,
		value: faker.word.adverb(),
		actionType: mockActionType(),
	};
}

export function mockActionType(): IActionTypeViewModel {
	return {
		name: faker.word.verb(),
	};
}

export function mockAttribute(): IActivityAttributeViewModel {
	return {
		unit: EnumUnitTypes.Miles,
		value: faker.number.float({
			min: 1,
			max: 20,
		}).toString(),
		attributeType: mockAttributeType(),
	};
}

export function mockAttributeType(): IAttributeTypeViewModel {
	return {
		name: faker.word.noun(),
	};
}

export function mockActivityStrava(): IStravaActivity {
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

export function mockStravaImport(): IStravaImport {
	const activityDate = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	}).format(faker.date.past());
	const movingTime = faker.number.float({
		min: 240,
		max: 1000,
	});
	const elevationLow = faker.number.float({
		min: 240,
		max: 1000,
	});
	return {
		"Activity ID": `${faker.number.int({
			min: 10,
		})}`,
		"Activity Date": activityDate,
		"Activity Name": `${faker.word.words()}`,
		"Activity Type": `${faker.word.verb()}`,
		"Activity Description": `${faker.word.words()}`,
		"Athlete Weight": `${faker.number.float(20)}`,
		Distance: `${faker.number.float({
			min: 240,
			max: 1000,
		})}`,
		"Average Speed": `${faker.number.float({
			min: 240,
			max: 1000,
		})}`,
		"Elapsed Time": `${faker.number.float({
			min: movingTime,
			max: movingTime + 100,
		})}`,
		"Elevation Low": `${elevationLow}`,
		"Elevation High": `${faker.number.float({
			min: elevationLow,
			max: elevationLow + 1000,
		})}`,
		"Max Speed": `${faker.number.float({
			min: 240,
			max: 1000,
		})}`,
		"Moving Time": `${movingTime}`,
		// Doesn't need to have a value, but is needed for the interface
		"Activity Count": "",
		"Activity Gear": "",
		"Activity Private Note": "",
		"Apparent Temperature": "",
		"Average Cadence": "",
		"Average Elapsed Speed": "",
		"Average Flow": "",
		"Average Grade Adjusted Pace": "",
		"Average Grade": "",
		"Average Heart Rate": "",
		"Average Negative Grade": "",
		"Average Positive Grade": "",
		"Average Temperature": "",
		"Average Watts": "",
		"Bike Weight": "",
		"Carbon Saved": "",
		"Cloud Cover": "",
		"Dirt Distance": "",
		"Downhill Time": "",
		"Elapsed Time_1": "",
		"Elevation Gain": "",
		"Elevation Loss": "",
		"From Upload": "",
		"Grade Adjusted Distance": "",
		"Jump Count": "",
		"Max Cadence": "",
		"Max Grade": "",
		"Max Heart Rate": "",
		"Max Heart Rate_1": "",
		"Max Temperature": "",
		"Max Watts": "",
		"Moon Phase": "",
		"Newly Explored Dirt Distance": "",
		"Newly Explored Distance": "",
		"Number of Runs": "",
		"Other Time": "",
		"Perceived Exertion": "",
		"Perceived Relative Effort": "",
		"Pool Length": "",
		"Power Count": "",
		"Precipitation Intensity": "",
		"Precipitation Probability": "",
		"Precipitation Type": "",
		"Prefer Perceived Exertion": "",
		"Relative Effort": "",
		"Relative Effort_1": "",
		"Start Time": "",
		"Sunrise Time": "",
		"Sunset Time": "",
		"Timer Time": "",
		"Total Cycles": "",
		"Total Grit": "",
		"Total Steps": "",
		"Total Weight Lifted": "",
		"Total Work": "",
		"Training Load": "",
		"UV Index": "",
		"Uphill Time": "",
		"Weather Condition": "",
		"Weather Observation Time": "",
		"Weather Ozone": "",
		"Weather Pressure": "",
		"Weather Temperature": "",
		"Weather Visibility": "",
		"Weighted Average Power": "",
		"Wind Bearing": "",
		"Wind Gust": "",
		"Wind Speed": "",
		Bike: "",
		Calories: "",
		Commute: "",
		Commute_1: "",
		Dewpoint: "",
		Distance_1: "",
		Filename: "",
		Flagged: "",
		Gear: "",
		Humidity: "",
		Intensity: "",
		Media: "",
		Type: "",
	};
}

export function importToCSV(model: IStravaImport) {
	return `${model["Activity ID"]},"${model["Activity Date"]}",${model["Activity Name"]},${model["Activity Type"]},${model["Activity Description"]},${model["Elapsed Time"]},${model.Distance},,,,,,,${model["Athlete Weight"]},,${model["Elapsed Time"]},${model["Moving Time"]},${model.Distance},${model["Max Speed"]},${model["Average Speed"]},,,${model["Elevation Low"]},${model["Elevation High"]},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,""`;
}

export function mockStravaImportExpected(model: IStravaImport, saved = false) {
	const viewModel: IActivityViewModel = {
		description: model["Activity Description"],
		source: EnumActivitySource.Strava,
		sourceId: model["Activity ID"],
		title: model["Activity Name"],
		calories: expect.any(Number),
		duration: expect.any(Number),
		weight: 200,
		weightLost: expect.any(Number),
		userId: TestUser.user_id,
		dateOccurred: dateToUTC(model["Activity Date"]),
		activityType: {
			name: model["Activity Type"],
		},
		actions: [],
		attributes: [{
			id: "",
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: "",
				name: "Duration Total",
				feature: EnumFeatures.exercises,
			},
		}, {
			id: "",
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: "",
				name: "Distance",
				feature: EnumFeatures.exercises,
			},
		}, {
			id: "",
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: "",
				name: "Speed Max",
				feature: EnumFeatures.exercises,
			},
		}, {
			id: "",
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: "",
				name: "Speed Average",
				feature: EnumFeatures.exercises,
			},
		}, {
			id: "",
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: "",
				name: "Elevation Low",
				feature: EnumFeatures.exercises,
			},
		}, {
			id: "",
			value: expect.any(String),
			unit: expect.any(Number),
			attributeType: {
				id: "",
				name: "Elevation High",
				feature: EnumFeatures.exercises,
			},
		}],
	};
	if (saved) {
		viewModel.id = expect.any(String);
		viewModel.dateCreated = expect.any(Number);
		viewModel.dateUpdated = expect.any(Number);
		viewModel.activityType.id = expect.any(String);
		viewModel.attributes?.forEach((attribute) => {
			attribute.id = expect.any(String);
			attribute.value = expect.any(String);
			attribute.unit = expect.any(Number);
			attribute.attributeType.id = expect.any(String);
		});
	}
	sortViewModelProperties(viewModel);
	return viewModel;
}

export function mockActivityStravaExpected(model: IStravaActivity) {
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

export function mockBaseExpected<T>(viewModel: T, includeDates = false): T {
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

export function mockActivityExpected(viewModel: IActivityViewModel): IActivityViewModel {
	const expected = mockBaseExpected(viewModel, true);
	expected.userId = TestUser.user_id;
	expected.calories = expect.any(Number);
	expected.weightLost = expect.any(Number);
	expected.activityType = mockActivityTypeExpected(expected.activityType);
	// Actions are sorted by the order property by default
	expected.actions = expected.actions?.map((action) => mockActionExpected(action));
	expected.attributes = expected.attributes?.map((attribute) => mockAttributeExpected(attribute));
	sortViewModelProperties(expected);
	return expected;
}

export function mockActivityTypeExpected(viewModel: IActivityTypeViewModel) {
	return mockBaseExpected(viewModel);
}

export function mockActionExpected(viewModel: IActivityActionViewModel) {
	const expected = mockBaseExpected(viewModel);
	expected.actionType = mockActionTypeExpected(expected.actionType);
	return expected;
}

export function mockActionTypeExpected(viewModel: IActionTypeViewModel) {
	return mockBaseExpected(viewModel);
}

export function mockAttributeTypeExpected(viewModel: IAttributeTypeViewModel) {
	const expected = mockBaseExpected(viewModel);
	expected.feature = EnumFeatures.exercises;
	return expected;
}

export function mockAttributeExpected(viewModel: IActivityAttributeViewModel) {
	const expected = mockBaseExpected(viewModel);
	// The API returns our value rounded to 4 decimal places
	expected.value = roundTo(parseFloat(expected.value)).toString();
	expected.attributeType = mockAttributeTypeExpected(expected.attributeType);
	return expected;
}

export function sortViewModelProperties(viewModel: IActivityViewModel) {
	viewModel.actions ??= [];
	viewModel.attributes ??= [];
	viewModel.actions.sort((lhs, rhs) => genericSort(lhs.order, rhs.order));
	viewModel.attributes.sort((lhs, rhs) => genericSort(lhs.attributeType.name, rhs.attributeType.name));
}

export function getLatest(viewModels: IActivityViewModel[]) {
	return viewModels[viewModels.length - 1];
}

export function getLatestExpected(viewModels: IActivityViewModel[]) {
	return mockActivityExpected(getLatest(viewModels));
}
