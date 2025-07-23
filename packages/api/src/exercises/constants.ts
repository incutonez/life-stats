// Per https://faroutguides.com/how-many-calories-do-you-burn-while-thru-hiking/
const PoundsToKilograms = 0.4536;

export const ACTIVITIES_REPOSITORY = "ACTIVITIES_REPOSITORY";

export const ACTIVITY_TYPES_REPOSITORY = "ACTIVITY_TYPES_REPOSITORY";

export const ACTIVITY_ATTRIBUTES_REPOSITORY = "ACTIVITY_ATTRIBUTES_REPOSITORY";

export const ACTIVITY_ACTIONS_REPOSITORY = "ACTIVITY_ACTIONS_REPOSITORY";

export const ROUTINE_ACTIONS_REPOSITORY = "ROUTINE_ACTIONS_REPOSITORY";

export const ROUTINES_REPOSITORY = "ROUTINES_REPOSITORY";

export const EnumActivitySource = {
	None: -1,
	Strava: 1,
} as const;
export type EnumActivitySource = typeof EnumActivitySource[keyof typeof EnumActivitySource];

export const EnumMETValue = {
	Walk: 6,
	Hike: 7,
	Run: 10,
	Bike: 11,
} as const;
export type EnumMETValue = typeof EnumMETValue[keyof typeof EnumMETValue];

/**
 * https://faroutguides.com/how-many-calories-do-you-burn-while-thru-hiking/
 * Calories Burned = MET value x Body Weight in Pounds x 0.4536 x Duration in Hours
 * We assume the average weight (if not passed in)... it's about 200 lbs in the US
 */
export function calculateCalories(activityType: string, duration: number, weight = 200) {
	let metValue: EnumMETValue = EnumMETValue.Walk;
	switch (activityType.toLowerCase()) {
		case "hike":
		case "hiking":
			metValue = EnumMETValue.Hike;
			break;
		case "run":
		case "running":
			metValue = EnumMETValue.Run;
			break;
		case "bike":
		case "biking":
		case "ride":
		case "riding":
			metValue = EnumMETValue.Bike;
			break;
	}
	return metValue * PoundsToKilograms * weight * duration;
}
