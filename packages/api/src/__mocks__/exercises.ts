import { faker } from "@faker-js/faker";
import { expect } from "vitest";
import { accessToken, expiresAt, mockedAxios, refreshToken } from "@/__mocks__/axios";
import { TestUser } from "@/__mocks__/users";
import { EnumFeatures } from "@/constants";
import { EnumActivitySource } from "@/exercises/constants";
import { IStravaActivity, IStravaImport } from "@/exercises/types";
import { IActionTypeViewModel } from "@/exercises/viewModels/action.type.viewmodel";
import { ActivityActionViewModel } from "@/exercises/viewModels/activity.action.viewmodel";
import { IActivityAttributeViewModel } from "@/exercises/viewModels/activity.attribute.viewmodel";
import { IActivityTypeViewModel } from "@/exercises/viewModels/activity.type.viewmodel";
import { IActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { RoutineViewModel } from "@/exercises/viewModels/routine.viewmodel";
import { ModelInterface } from "@/types";
import { dateToUTC, genericSort, roundTo } from "@/utils";
import { AttributeTypeListViewModel, IAttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

export type IActivityActionViewModel = ModelInterface<ActivityActionViewModel>;

export type IRoutineViewModel = ModelInterface<RoutineViewModel>;

export type IAttributeTypeListViewModel = ModelInterface<AttributeTypeListViewModel>;

// Needed in axios.ts
export const stravaActivities = [
	mockActivityStrava(),
	mockActivityStrava(),
	mockActivityStrava(),
	mockActivityStrava(),
	mockActivityStrava(),
];

export const stravaImports = [
	mockStravaImport(),
	mockStravaImport(),
	mockStravaImport(),
	mockStravaImport(),
	mockStravaImport(),
];

export function getActivity1(): IActivityViewModel {
	return {
		"title": "gosh midst",
		"dateOccurred": 1734907890893,
		"weight": 279.41390255099657,
		"duration": 5.245613417629027,
		"description": "Theca ancilla debeo theologus demens coadunatio solus arma. Turbo voluptatibus caelestis succurro virtus contego torqueo. Aveho non vesica vulgaris amplus ducimus aro.Crinis et desparatus caste abbas sortitus. Ventito ultio torqueo tutis uredo concido laborum aeneus stips. Dolorem spiritus cultura audax decimus.Ipsum convoco tonsor cupiditas deprecator. Creber conventus cupiditate. Decimus cunctatio appono.",
		"activityType": {
			"name": "orchestrate",
		},
		"actions": [{
			"order": 0,
			"value": "mostly",
			"actionType": {
				"name": "buck",
			},
		}, {
			"order": 1,
			"value": "fatally",
			"actionType": {
				"name": "sizzle",
			},
		}, {
			"order": 2,
			"value": "upward",
			"actionType": {
				"name": "navigate",
			},
		}, {
			"order": 3,
			"value": "fondly",
			"actionType": {
				"name": "mooch",
			},
		}],
		"attributes": [{
			"unit": 3,
			"value": "11.546676402040148",
			"attributeType": {
				"name": "pants",
			},
		}, {
			"unit": 3,
			"value": "16.649168443330527",
			"attributeType": {
				"name": "charm",
			},
		}, {
			"unit": 3,
			"value": "10.972127803673798",
			"attributeType": {
				"name": "replacement",
			},
		}, {
			"unit": 3,
			"value": "1.1637137166398528",
			"attributeType": {
				"name": "wasabi",
			},
		}],
	};
}

export function getActivity2(): IActivityViewModel {
	return {
		"actions": [{
			"order": 0,
			"value": "mockingly",
			"actionType": {
				"name": "exempt",
			},
		}, {
			"order": 1,
			"value": "unaccountably",
			"actionType": {
				"name": "miscalculate",
			},
		}, {
			"order": 2,
			"value": "mortally",
			"actionType": {
				"name": "rout",
			},
		}, {
			"order": 3,
			"value": "unnecessarily",
			"actionType": {
				"name": "investigate",
			},
		}],
		"attributes": [{
			"unit": 3,
			"value": "7.350598877791132",
			"attributeType": {
				"name": "monocle",
			},
		}, {
			"unit": 3,
			"value": "4.483942017650287",
			"attributeType": {
				"name": "sustenance",
			},
		}, {
			"unit": 3,
			"value": "19.73298222180526",
			"attributeType": {
				"name": "crest",
			},
		}, {
			"unit": 3,
			"value": "1.6453643100474324",
			"attributeType": {
				"name": "petticoat",
			},
		}],
		"title": "dishearten frivolous",
		"dateOccurred": 1748998712885,
		"weight": 298.9319832033898,
		"duration": 15.226907854135169,
		"description": "Earum auctor arma. Succurro aliqua tutis caput tergum ubi cunabula deleo. Curia comburo cimentarius causa cribro arbitro architecto.Corona ullam corroboro cunae alter depono via at crur. Concido decerno sequi. Utrum varius eligendi comitatus cibus xiphias creator.Eius cilicium cohibeo creo. Tristis timidus suggero audio. Creo decumbo cupiditas succurro comis.",
		"activityType": {
			"name": "rear",
		},
	};
}

export function getActivity1Update(viewModel: IActivityViewModel) {
	viewModel = structuredClone(viewModel);
	const { actions = [], attributes = [] } = viewModel;
	// Change title
	viewModel.title = faker.word.words();
	// Delete 2nd action
	actions.splice(1, 1);
	// Update 1st action's value
	actions[0].value += faker.string.uuid();
	// Create new action
	actions.push({
		"order": 1,
		"value": "fiercely",
		"actionType": {
			"name": "unlearn",
		},
	});

	// Delete 3rd attribute
	attributes.splice(2, 1);
	// Update 1st attribute
	attributes[0].value = "45.123456789";
	// Create brand new attributeType while updating
	attributes[0].attributeType!.name += faker.string.uuid();
	// Create new attribute
	attributes.push({
		"unit": 3,
		"value": "14.083588556295815",
		"attributeType": {
			"name": "skyscraper",
		},
	});

	return viewModel;
}

export function getActivity2Update(): IActivityViewModel {
	return {
		"actions": [{
			"order": 0,
			"value": "freely",
			"actionType": {
				"name": "mummify",
			},
		}, {
			"order": 1,
			"value": "carefully",
			"actionType": {
				"name": "see",
			},
		}, {
			"order": 2,
			"value": "wetly",
			"actionType": {
				"name": "low",
			},
		}, {
			"order": 3,
			"value": "speedily",
			"actionType": {
				"name": "controvert",
			},
		}],
		"attributes": [{
			"unit": 3,
			"value": "18.38521739584988",
			"attributeType": {
				"name": "puritan",
			},
		}, {
			"unit": 3,
			"value": "5.750170118986799",
			"attributeType": {
				"name": "saw",
			},
		}, {
			"unit": 3,
			"value": "9.44359021988665",
			"attributeType": {
				"name": "pants",
			},
		}, {
			"unit": 3,
			"value": "10.352085950608288",
			"attributeType": {
				"name": "decryption",
			},
		}],
		"title": "less",
		"dateOccurred": 1758767543646,
		"weight": 280.29028297654725,
		"duration": 19.18079674658904,
		"description": "Adiuvo nemo commemoro. Sint rerum conscendo spero omnis rerum tenus bellum aegrotatio. Laudantium caecus autus hic optio.\nSubito accusator cetera aliqua corroboro non adipisci ciminatio ciminatio. Tristis quis civis quidem alo considerobasium damno. Modi ager adulescens culpo.\nCrur comes atavus velit sollicito tabula. Desolo patrocinor benevolentia desino cupiditas defluo verbum acervus denego. Stultus utilis ratione.",
		"activityType": {
			"name": "categorise",
		},
	};
}

export function getRoutine1(): IRoutineViewModel {
	return {
		"name": "juggernaut",
		"actions": [{
			"order": 1,
			"value": "seldom",
			"actionType": {
				"name": "redound",
			},
			"id": "f4631337-7679-45dd-bf8b-c27737e26d07",
		}, {
			"order": 2,
			"value": "kissingly",
			"actionType": {
				"name": "westernise",
			},
			"id": "7e2cd53b-b82b-4dd4-b723-920f14d1c3af",
		}, {
			"order": 3,
			"value": "unbearably",
			"actionType": {
				"name": "rewrite",
			},
			"id": "c0768960-0cfa-49bd-a0da-157106e27388",
		}, {
			"order": 4,
			"value": "anxiously",
			"actionType": {
				"name": "tabulate",
			},
			"id": "c5a66192-7abe-46b0-b0bd-47ef27293e28",
		}, {
			"order": 5,
			"value": "merrily",
			"actionType": {
				"name": "neglect",
			},
			"id": "d1c99d64-609b-4660-9c30-829a2bf2f2ff",
		}, {
			"order": 6,
			"value": "briefly",
			"actionType": {
				"name": "reboot",
			},
			"id": "9888c49d-dc4e-4f48-a93b-a4fb0bc24350",
		}, {
			"order": 7,
			"value": "unbearably",
			"actionType": {
				"name": "emphasize",
			},
			"id": "055b945c-9181-4885-aafc-67bf31c50c6f",
		}, {
			"order": 8,
			"value": "readily",
			"actionType": {
				"name": "chip",
			},
			"id": "e8935591-5efd-4a6b-ae95-d15743722320",
		}, {
			"order": 9,
			"value": "even",
			"actionType": {
				"name": "father",
			},
			"id": "1ec98450-7c34-420c-aced-f4dd1ed38f6a",
		}, {
			"order": 10,
			"value": "queasily",
			"actionType": {
				"name": "communicate",
			},
			"id": "dc7ee367-e7bc-4cb3-9211-ddd192980101",
		}],
	};
}

export function getRoutine2(): IRoutineViewModel {
	return {
		"name": "aftermath",
		"actions": [{
			"order": 1,
			"value": "yieldingly",
			"actionType": {
				"name": "transcend",
			},
			"id": "d973cb5b-2b1c-4b89-8466-d8aa7973922c",
		}, {
			"order": 7,
			"value": "wearily",
			"actionType": {
				"name": "gallivant",
			},
			"id": "b3063543-d790-4189-b8ee-e35fb3d837a8",
		}, {
			"order": 18,
			"value": "fortunately",
			"actionType": {
				"name": "fathom",
			},
			"id": "9554f3f0-2841-41ae-9434-87f8b96ac1c0",
		}, {
			"order": 14,
			"value": "less",
			"actionType": {
				"name": "dislocate",
			},
			"id": "fe00f167-18f0-487a-b65b-89cf8b9ea8e7",
		}, {
			"order": 17,
			"value": "strictly",
			"actionType": {
				"name": "scuttle",
			},
			"id": "69104a08-501f-489f-905e-5117f778181b",
		}, {
			"order": 4,
			"value": "kookily",
			"actionType": {
				"name": "tighten",
			},
			"id": "d69e7557-9729-4e0d-8cd5-1413922a028c",
		}, {
			"order": 17,
			"value": "greatly",
			"actionType": {
				"name": "waft",
			},
			"id": "037dc63f-6b79-4f08-b4b1-b4c721c4cb5a",
		}, {
			"order": 10,
			"value": "unabashedly",
			"actionType": {
				"name": "rationalize",
			},
			"id": "807a2ac4-df56-43cd-984f-1e915c4fbf58",
		}, {
			"order": 10,
			"value": "questionably",
			"actionType": {
				"name": "drowse",
			},
			"id": "515c5f84-5382-4f2c-ab3a-41d64018c5c2",
		}, {
			"order": 18,
			"value": "commonly",
			"actionType": {
				"name": "fly",
			},
			"id": "70f7768a-abfa-4d17-a927-07ce0d83096c",
		}],
	};
}

export function getRoutine1Update(viewModel: IRoutineViewModel) {
	viewModel = structuredClone(viewModel);
	// Remove 1st and last
	viewModel.actions.splice(0, 1);
	viewModel.actions.splice(8, 1);
	// Update 2nd (now 1st)
	viewModel.actions[0].value = "blah";
	// Create a new one
	viewModel.actions.push({
		"order": 2,
		"value": "greedily",
		"actionType": {
			"name": "satirize",
		},
	});
	return viewModel;
}

export function getRoutine2Update(): IRoutineViewModel {
	return {
		"name": "heroine",
		"actions": [{
			"order": 17,
			"value": "quirkily",
			"actionType": {
				"name": "guest",
			},
		}, {
			"order": 19,
			"value": "awkwardly",
			"actionType": {
				"name": "vulgarise",
			},
		}, {
			"order": 13,
			"value": "thankfully",
			"actionType": {
				"name": "jiggle",
			},
		}, {
			"order": 3,
			"value": "cruelly",
			"actionType": {
				"name": "pity",
			},
		}, {
			"order": 11,
			"value": "broadly",
			"actionType": {
				"name": "concrete",
			},
		}, {
			"order": 16,
			"value": "speedily",
			"actionType": {
				"name": "microblog",
			},
		}, {
			"order": 15,
			"value": "defiantly",
			"actionType": {
				"name": "satirise",
			},
		}, {
			"order": 4,
			"value": "instantly",
			"actionType": {
				"name": "idle",
			},
		}, {
			"order": 3,
			"value": "rapidly",
			"actionType": {
				"name": "fictionalize",
			},
		}, {
			"order": 9,
			"value": "angrily",
			"actionType": {
				"name": "quantify",
			},
		}],
	};
}

export function useMockedStravaAPI() {
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
		viewModel.activityType!.id = expect.any(String);
		viewModel.attributes?.forEach((attribute) => {
			attribute.id = expect.any(String);
			attribute.value = expect.any(String);
			attribute.unit = expect.any(Number);
			attribute.attributeType!.id = expect.any(String);
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

export function mockBaseExpected<T>(viewModel: T, includeDates = false, includeUser = false): T {
	const expected = structuredClone<any>(viewModel);
	/* We use ||= here because when we finally set the ID, we actually want to make sure it's the same... this really only
	 * matters on the initial creation */
	expected.id ||= expect.any(String);
	if (includeDates) {
		expected.dateCreated ||= expect.any(Number);
		expected.dateUpdated = expect.any(Number);
	}
	if (includeUser) {
		expected.userId = TestUser.user_id;
	}
	return expected;
}

export function mockActivityExpected(viewModel: IActivityViewModel, includeDates = true, includeUser = true): IActivityViewModel {
	const expected = mockBaseExpected(viewModel, includeDates, includeUser);
	expected.calories = expect.any(Number);
	expected.weightLost = expect.any(Number);
	if (expected.actions) {
		expected.actions = expected.actions.map((action) => mockActionExpected(action));
	}
	if (expected.attributes) {
		expected.attributes = expected.attributes.map((attribute) => mockAttributeExpected(attribute));
	}
	if (expected.activityType) {
		expected.activityType = mockActivityTypeExpected(expected.activityType);
	}
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
	if (expected.activityAttributes) {
		expected.activityAttributes = expected.activityAttributes.map((attribute) => {
			attribute = mockAttributeExpected(attribute);
			if (attribute.activity) {
				const activity = mockActivityExpected(attribute.activity, false, false);
				// When in an attributeType, we don't have calories or weightLost because attributeType is not returned
				delete activity.calories;
				delete activity.weightLost;
				attribute.activity = activity;
			}
			return attribute;
		});
	}
	return expected;
}

export function mockAttributeTypeListExpected(viewModel: Partial<IAttributeTypeListViewModel>) {
	const expected = mockBaseExpected<Partial<IAttributeTypeListViewModel>>({
		id: viewModel.id,
		name: viewModel.name!,
		feature: viewModel.feature ?? EnumFeatures.exercises,
	}, true, true);
	expected.attributes = viewModel.attributes ?? expect.any(Number);
	return expected as IAttributeTypeListViewModel;
}

export function getAttributeType1(): IAttributeTypeViewModel {
	return {
		"name": "pants",
		activityAttributes: [{
			"unit": 3,
			"value": "11.546676402040148",
			activity: {
				"title": "gosh midst",
				"dateOccurred": 1734907890893,
				"weight": 279.41390255099657,
				"duration": 5.245613417629027,
				"description": "Theca ancilla debeo theologus demens coadunatio solus arma. Turbo voluptatibus caelestis succurro virtus contego torqueo. Aveho non vesica vulgaris amplus ducimus aro.Crinis et desparatus caste abbas sortitus. Ventito ultio torqueo tutis uredo concido laborum aeneus stips. Dolorem spiritus cultura audax decimus.Ipsum convoco tonsor cupiditas deprecator. Creber conventus cupiditate. Decimus cunctatio appono.",
			},
		}],
	};
}

export function mockAttributeExpected(viewModel: IActivityAttributeViewModel) {
	const expected = mockBaseExpected(viewModel);
	// The API returns our value rounded to 4 decimal places
	expected.value = roundTo(parseFloat(expected.value)).toString();
	if (expected.attributeType) {
		expected.attributeType = mockAttributeTypeExpected(expected.attributeType);
	}
	return expected;
}

export function mockRoutineExpected(viewModel: ModelInterface<RoutineViewModel>, isCreate = false) {
	const expected = mockBaseExpected(viewModel, true, true);
	expected.actions = expected.actions?.map((action) => {
		const actionExpected = mockActionExpected(action);
		if (isCreate && action.id) {
			// We want to make sure the ID changes from the already saved action
			actionExpected.id = expect.not.stringContaining(action.id);
		}
		return actionExpected;
	});
	expected.actions.sort((lhs, rhs) => genericSort(lhs.order, rhs.order));
	return expected;
}

export function sortViewModelProperties(viewModel: IActivityViewModel) {
	if (viewModel.actions) {
		// Actions are sorted by the order property by default
		viewModel.actions.sort((lhs, rhs) => genericSort(lhs.order, rhs.order));
	}
	if (viewModel.attributes) {
		viewModel.attributes.sort((lhs, rhs) => genericSort(lhs.attributeType!.name, rhs.attributeType!.name));
	}
}

export function getActionTypes(viewModels: (IActivityViewModel | IRoutineViewModel | undefined)[]) {
	const actionTypes: IActionTypeViewModel[] = [];
	viewModels.forEach((viewModel) => {
		viewModel?.actions?.forEach(({ actionType }) => {
			const found = actionTypes.find((record) => record.id === actionType.id);
			if (!found) {
				actionTypes.push({
					id: actionType.id,
					name: actionType.name,
				});
			}
		});
	});
	actionTypes.sort((lhs, rhs) => genericSort(lhs.name, rhs.name));
	return actionTypes;
}

export function mockAttributeTypesExpected(viewModels: (IActivityViewModel | undefined)[]) {
	// These initial attribute types come from the Strava imports
	const records: IAttributeTypeViewModel[] = [];
	viewModels.forEach((viewModel) => {
		if (viewModel) {
			viewModel.attributes?.forEach(({ attributeType }) => {
				const found = records.find((record) => record.name === attributeType!.name);
				if (!found) {
					records.push(mockAttributeTypeExpected(attributeType!));
				}
			});
		}
	});
	// If we have records, then that means the activities have been previously defined, so let's add the strava imports
	if (records.length) {
		records.push({
			id: expect.any(String),
			name: "Duration Total",
			feature: EnumFeatures.exercises,
		}, {
			id: expect.any(String),
			name: "Distance",
			feature: EnumFeatures.exercises,
		}, {
			id: expect.any(String),
			name: "Speed Max",
			feature: EnumFeatures.exercises,
		}, {
			id: expect.any(String),
			name: "Speed Average",
			feature: EnumFeatures.exercises,
		}, {
			id: expect.any(String),
			name: "Elevation Low",
			feature: EnumFeatures.exercises,
		}, {
			id: expect.any(String),
			name: "Elevation High",
			feature: EnumFeatures.exercises,
		});
	}
	records.sort((lhs, rhs) => genericSort(lhs.name, rhs.name));
	return records;
}

export function getActivityAttributeTypes(viewModel?: IActivityViewModel, includeAttribute = false) {
	const records: IAttributeTypeViewModel[] = [];
	viewModel?.attributes?.forEach(({ attributeType, ...attribute }) => {
		if (attributeType) {
			records.push({
				...attributeType,
				activityAttributes: includeAttribute ? [attribute] : [],
			});
		}
	});
	return records;
}

export function mockAttributeTypesListExpected(viewModels: (IAttributeTypeViewModel | undefined)[]): IAttributeTypeListViewModel[] {
	// These initial attribute types come from the Strava imports
	const records: IAttributeTypeListViewModel[] = [];
	viewModels.forEach((viewModel) => {
		if (viewModel) {
			const found = records.find((record) => record.id === viewModel.id);
			if (!found) {
				records.push(mockAttributeTypeListExpected({
					...viewModel,
					attributes: viewModel.activityAttributes?.length,
				}));
			}
		}
	});
	// If we have records, then that means the activities have been previously defined, so let's add the strava imports
	if (records.length) {
		records.push(
			mockAttributeTypeListExpected({
				name: "Duration Total",
				attributes: 10,
			}),
			mockAttributeTypeListExpected({
				name: "Distance",
				attributes: 10,
			}),
			mockAttributeTypeListExpected({
				name: "Speed Max",
				attributes: 10,
			}),
			mockAttributeTypeListExpected({
				name: "Speed Average",
				attributes: 10,
			}),
			mockAttributeTypeListExpected({
				name: "Elevation Low",
				attributes: 5,
			}),
			mockAttributeTypeListExpected({
				name: "Elevation High",
				attributes: 5,
			}),
		);
	}
	records.sort((lhs, rhs) => genericSort(lhs.name, rhs.name));
	return records;
}
