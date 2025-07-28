import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { EnumUnitTypes } from "@/constants";

export class ExerciseActivityUpload {
	/**
	 * Having this transform here is absolutely crucial.  If we didn't have this, then the addHeaders value would be a
	 * string, which would kill all of our logic.
	 */
	@Transform(({ value = null }) => value ? JSON.parse(value) : false)
	@ApiProperty({
		required: false,
	})
	addHeaders?: boolean;

	@ApiProperty({
		type: "string",
		format: "binary",
		required: true,
	})
	declare file: Express.Multer.File;
}

export interface IStubAttributeOptions {
	unit?: EnumUnitTypes;
	unitConversion?: EnumUnitTypes;
}

export interface IStravaImport {
	"Activity ID": string;
	// This is in UTC
	"Activity Date": string;
	"Activity Name": string;
	"Activity Type": string;
	"Activity Description": string;
	"Elapsed Time": string;
	"Distance": string;
	"Max Heart Rate": string;
	"Relative Effort": string;
	"Commute": string;
	"Activity Private Note": string;
	"Activity Gear": string;
	"Filename": string;
	"Athlete Weight": string;
	"Bike Weight": string;
	"Elapsed Time_1": string;
	"Moving Time": string;
	"Distance_1": string;
	"Max Speed": string;
	"Average Speed": string;
	"Elevation Gain": string;
	"Elevation Loss": string;
	"Elevation Low": string;
	"Elevation High": string;
	"Max Grade": string;
	"Average Grade": string;
	"Average Positive Grade": string;
	"Average Negative Grade": string;
	"Max Cadence": string;
	"Average Cadence": string;
	"Max Heart Rate_1": string;
	"Average Heart Rate": string;
	"Max Watts": string;
	"Average Watts": string;
	"Calories": string;
	"Max Temperature": string;
	"Average Temperature": string;
	"Relative Effort_1": string;
	"Total Work": string;
	"Number of Runs": string;
	"Uphill Time": string;
	"Downhill Time": string;
	"Other Time": string;
	"Perceived Exertion": string;
	"Type": string;
	"Start Time": string;
	"Weighted Average Power": string;
	"Power Count": string;
	"Prefer Perceived Exertion": string;
	"Perceived Relative Effort": string;
	"Commute_1": string;
	"Total Weight Lifted": string;
	"From Upload": string;
	"Grade Adjusted Distance": string;
	"Weather Observation Time": string;
	"Weather Condition": string;
	"Weather Temperature": string;
	"Apparent Temperature": string;
	"Dewpoint": string;
	"Humidity": string;
	"Weather Pressure": string;
	"Wind Speed": string;
	"Wind Gust": string;
	"Wind Bearing": string;
	"Precipitation Intensity": string;
	"Sunrise Time": string;
	"Sunset Time": string;
	"Moon Phase": string;
	"Bike": string;
	"Gear": string;
	"Precipitation Probability": string;
	"Precipitation Type": string;
	"Cloud Cover": string;
	"Weather Visibility": string;
	"UV Index": string;
	"Weather Ozone": string;
	"Jump Count": string;
	"Total Grit": string;
	"Average Flow": string;
	"Flagged": string;
	"Average Elapsed Speed": string;
	"Dirt Distance": string;
	"Newly Explored Distance": string;
	"Newly Explored Dirt Distance": string;
	"Activity Count": string;
	"Total Steps": string;
	"Carbon Saved": string;
	"Pool Length": string;
	"Training Load": string;
	"Intensity": string;
	"Average Grade Adjusted Pace": string;
	"Timer Time": string;
	"Total Cycles": string;
	"Media": string;
}

export interface IStravaAuthResponse {
	"token_type": string;
	"expires_at": number;
	"expires_in": number;
	"refresh_token": string;
	"access_token": string;
}

export interface IStravaActivity {
	"resource_state": number;
	"athlete": {
		"id": number;
		"resource_state": number;
	};
	"name": string;
	"distance": number;
	// total amount of time from when the activity started to when it ended, including all pauses (in seconds)
	"moving_time": number;
	// number of seconds spent actively moving (elapsed_time - paused time)
	"elapsed_time": number;
	"elev_low"?: number;
	"elev_high"?: number;
	"total_elevation_gain": number;
	"type": string;
	"sport_type": string;
	"workout_type"?: unknown;
	"id": number;
	"external_id": string;
	"upload_id": number;
	"start_date": string;
	"start_date_local": string;
	"timezone": string;
	"utc_offset": number;
	"start_latlng"?: unknown;
	"end_latlng"?: unknown;
	"location_city"?: unknown;
	"location_state"?: unknown;
	"location_country": string;
	"achievement_count": number;
	"kudos_count": number;
	"comment_count": number;
	"athlete_count": number;
	"photo_count": number;
	"map": {
		"id": string;
		"summary_polyline"?: unknown;
		"resource_state": number;
	};
	"trainer": boolean;
	"commute": boolean;
	"manual": boolean;
	"private": boolean;
	"flagged": boolean;
	"gear_id": string;
	"from_accepted_tag": boolean;
	"average_speed": number;
	"max_speed": number;
	"average_cadence": number;
	"average_watts": number;
	"weighted_average_watts": number;
	"kilojoules": number;
	"device_watts": boolean;
	"has_heartrate": boolean;
	"average_heartrate": number;
	"max_heartrate": number;
	"max_watts": number;
	"pr_count": number;
	"total_photo_count": number;
	"has_kudoed": boolean;
	"suffer_score": number;
}
