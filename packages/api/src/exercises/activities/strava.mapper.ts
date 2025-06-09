import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { EnumUnitTypes, SecondsInHour, SESSION_STORAGE } from "@/constants";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { calculateCalories, EnumActivitySource } from "@/exercises/constants";
import { IStravaActivity, IStravaImport } from "@/exercises/types";
import { dateToUTC } from "@/utils";
import { IExerciseActivityAttributeCreateViewModel } from "@/viewModels/exercises/exercise.activity.attribute.viewmodel";
import { IExerciseActivityCreateViewModel	 } from "@/viewModels/exercises/exercise.activity.viewmodel";
import { UserSettingsViewModel } from "@/viewModels/user.viewmodel";

@Injectable()
export class StravaMapper {
	constructor(@Inject(SESSION_STORAGE) private readonly storage: SessionStorageService, private readonly activitiesMapper: ActivitiesMapper) {
	}

	apiToViewModel(entity: IStravaActivity, userSettings?: UserSettingsViewModel): IExerciseActivityCreateViewModel {
		const userId = this.storage.getUserId();
		const attributes: (IExerciseActivityAttributeCreateViewModel | undefined)[] = [
			this.activitiesMapper.stubAttribute(entity.elapsed_time.toString(), "Time Elapsed", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.activitiesMapper.stubAttribute(entity.moving_time.toString(), "Time Moving", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.activitiesMapper.stubAttribute(entity.distance.toString(), "Distance", {
				unit: EnumUnitTypes.Meters,
				unitConversion: EnumUnitTypes.Kilometers,
			}),
			this.activitiesMapper.stubAttribute(entity.max_speed.toString(), "Speed Max", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.activitiesMapper.stubAttribute(entity.average_speed.toString(), "Speed Average", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.activitiesMapper.stubAttribute(entity.elev_low?.toString(), "Elevation Low", {
				unit: EnumUnitTypes.Meters,
			}),
			this.activitiesMapper.stubAttribute(entity.elev_high?.toString(), "Elevation High", {
				unit: EnumUnitTypes.Meters,
			}),
			this.activitiesMapper.stubAttribute(entity.location_city as never, "Location City"),
			this.activitiesMapper.stubAttribute(entity.location_state as never, "Location State"),
			this.activitiesMapper.stubAttribute(entity.location_country, "Location Country"),
			this.activitiesMapper.stubAttribute(calculateCalories(entity.type, entity.moving_time / SecondsInHour, userSettings?.exercises.weight).toString(), "Calories (MET)"),
		];

		return {
			userId,
			dateOccurred: new Date(entity.start_date).getTime(),
			source: EnumActivitySource.Strava,
			sourceId: entity.id.toString(),
			title: entity.name,
			activityType: {
				userId,
				name: entity.type,
			},
			attributes: attributes.filter((value) => value !== undefined),
		};
	}

	importToViewModel(entity: IStravaImport): IExerciseActivityCreateViewModel {
		const userId = this.storage.getUserId();
		const attributes: (IExerciseActivityAttributeCreateViewModel | undefined)[] = [
			// Time should be stored in seconds
			this.activitiesMapper.stubAttribute(entity["Elapsed Time"], "Time Elapsed", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.activitiesMapper.stubAttribute(entity["Moving Time"], "Time Moving", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.activitiesMapper.stubAttribute(entity["Distance"], "Distance", {
				unit: EnumUnitTypes.Kilometers,
			}),
			this.activitiesMapper.stubAttribute(entity["Max Speed"], "Speed Max", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.activitiesMapper.stubAttribute(entity["Average Speed"], "Speed Average", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.activitiesMapper.stubAttribute(entity["Elevation Low"], "Elevation Low", {
				unit: EnumUnitTypes.Meters,
			}),
			this.activitiesMapper.stubAttribute(entity["Elevation High"], "Elevation High", {
				unit: EnumUnitTypes.Meters,
			}),
			this.activitiesMapper.stubAttribute(entity["Calories"], "Calories"),
		];

		return {
			userId,
			source: EnumActivitySource.Strava,
			sourceId: entity["Activity ID"],
			dateOccurred: dateToUTC(entity["Activity Date"]),
			title: entity["Activity Name"],
			description: entity["Activity Description"],
			activityType: {
				userId,
				name: entity["Activity Type"],
			},
			attributes: attributes.filter((value) => value !== undefined),
		};
	}
}
