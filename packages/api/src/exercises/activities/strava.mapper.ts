import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { EnumFeatures, EnumUnitTypes, PoundToCalories, SecondsInHour, SESSION_STORAGE } from "@/constants";
import { calculateCalories, EnumActivitySource } from "@/exercises/constants";
import { IStravaActivity, IStravaImport, IStubAttributeOptions } from "@/exercises/types";
import {
	IActivityAttributeCreateViewModel,
	IActivityAttributeViewModel,
} from "@/exercises/viewModels/activity.attribute.viewmodel";
import { IActivityCreateViewModel, IActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { convertToUnit, dateToUTC, localizeValue } from "@/utils";

@Injectable()
export class StravaMapper {
	constructor(@Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	stubAttribute(value: string | undefined, field: string, { unit, unitConversion }: IStubAttributeOptions = {}): IActivityAttributeViewModel | undefined {
		if (value) {
			const convertedValue = convertToUnit({
				value,
				unit,
				unitTo: unitConversion,
			});
			const localizedValue = localizeValue({
				value: convertedValue.value,
				unit: convertedValue.unit,
				measurementSystem: this.storage.getMeasurementSystem(),
			});
			return {
				id: "",
				value: localizedValue.value,
				unit: localizedValue.unit,
				attributeType: {
					id: "",
					name: field,
					feature: EnumFeatures.exercises,
				},
			};
		}
		return undefined;
	}

	apiToViewModel(entity: IStravaActivity): IActivityViewModel {
		const userId = this.storage.getUserId();
		const activityType = entity.type;
		const duration = entity.moving_time / SecondsInHour;
		const weight = this.storage.getUserSettings().exercises.weight ?? 200;
		const calories = calculateCalories(activityType, duration, weight);
		const attributes: (IActivityAttributeViewModel | undefined)[] = [
			this.stubAttribute(entity.elapsed_time.toString(), "Duration Total", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.stubAttribute(entity.distance.toString(), "Distance", {
				unit: EnumUnitTypes.Meters,
				unitConversion: EnumUnitTypes.Kilometers,
			}),
			this.stubAttribute(entity.max_speed.toString(), "Speed Max", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.stubAttribute(entity.average_speed.toString(), "Speed Average", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.stubAttribute(entity.elev_low?.toString(), "Elevation Low", {
				unit: EnumUnitTypes.Meters,
			}),
			this.stubAttribute(entity.elev_high?.toString(), "Elevation High", {
				unit: EnumUnitTypes.Meters,
			}),
			this.stubAttribute(entity.location_city as never, "Location City"),
			this.stubAttribute(entity.location_state as never, "Location State"),
			this.stubAttribute(entity.location_country, "Location Country"),
		];

		return {
			userId,
			weight,
			duration,
			calories,
			id: "",
			weightLost: calories ? calories / PoundToCalories : undefined,
			dateOccurred: new Date(entity.start_date).getTime(),
			source: EnumActivitySource.Strava,
			sourceId: entity.id.toString(),
			title: entity.name,
			actions: [],
			activityType: {
				id: "",
				userId,
				name: activityType,
			},
			attributes: attributes.filter((value) => value !== undefined),
		};
	}

	importToViewModel(entity: IStravaImport): IActivityCreateViewModel {
		const userId = this.storage.getUserId();
		const activityType = entity["Activity Type"];
		const duration = parseFloat(entity["Moving Time"]) / SecondsInHour;
		const weight = this.storage.getUserSettings().exercises.weight ?? 200;
		const calories = calculateCalories(activityType, duration, weight);
		const attributes: (IActivityAttributeCreateViewModel | undefined)[] = [
			// Time should be stored in seconds
			this.stubAttribute(entity["Elapsed Time"], "Duration Total", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.stubAttribute(entity["Distance"], "Distance", {
				unit: EnumUnitTypes.Kilometers,
			}),
			this.stubAttribute(entity["Max Speed"], "Speed Max", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.stubAttribute(entity["Average Speed"], "Speed Average", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.stubAttribute(entity["Elevation Low"], "Elevation Low", {
				unit: EnumUnitTypes.Meters,
			}),
			this.stubAttribute(entity["Elevation High"], "Elevation High", {
				unit: EnumUnitTypes.Meters,
			}),
		];

		return {
			userId,
			weight,
			duration,
			calories,
			actions: [],
			weightLost: calories ? calories / PoundToCalories : undefined,
			source: EnumActivitySource.Strava,
			sourceId: entity["Activity ID"],
			dateOccurred: dateToUTC(entity["Activity Date"]),
			title: entity["Activity Name"],
			description: entity["Activity Description"],
			activityType: {
				name: activityType,
			},
			attributes: attributes.filter((value) => value !== undefined),
		};
	}
}
