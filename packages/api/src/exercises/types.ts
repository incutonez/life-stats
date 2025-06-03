import { ApiProperty } from "@nestjs/swagger";
import { EnumUnitTypes } from "@/constants";
import { EnumAttributeType } from "@/exercises/constants";

export class ExerciseActivityUpload {
	@ApiProperty({
		type: "string",
		format: "binary",
		required: true,
	})
	declare file: Express.Multer.File;
}

export interface IStubAttributeOptions {
	type?: EnumAttributeType;
	unit?: EnumUnitTypes;
	unitDisplay?: EnumUnitTypes;
}

export interface IUploadStrava {
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
