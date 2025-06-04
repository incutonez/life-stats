import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { EnumUnitTypes, SESSION_STORAGE } from "@/constants";
import {
	IExerciseActivityAttributeCreate,
	IExerciseActivityAttributeModel,
} from "@/db/models/ExerciseActivityAttributeModel";
import { IExerciseActivityCreate, IExerciseActivityModel } from "@/db/models/ExerciseActivityModel";
import { IExerciseActivityTypeCreate, IExerciseActivityTypesModel } from "@/db/models/ExerciseActivityTypesModel";
import { IExerciseAttributeTypeCreate, IExerciseAttributeTypesModel } from "@/db/models/ExerciseAttributeTypesModel";
import { EnumActivitySource, EnumAttributeType } from "@/exercises/constants";
import { IStubAttributeOptions, IUploadStrava } from "@/exercises/types";
import { addMetaInfo, convertToUnit, dateToUTC, localizeValue } from "@/utils";
import { IExerciseActivityAttributeCreateViewModel, IExerciseActivityAttributeViewModel } from "@/viewModels/exercises/exercise.activity.attribute.viewmodel";
import {
	IExerciseActivityTypeCreateViewModel,
	IExerciseActivityTypeViewModel,
} from "@/viewModels/exercises/exercise.activity.type.viewmodel";
import { IExerciseActivityCreateViewModel,	IExerciseActivityViewModel } from "@/viewModels/exercises/exercise.activity.viewmodel";
import {
	IExerciseAttributeTypeCreateViewModel,
	IExerciseAttributeTypeViewModel,
} from "@/viewModels/exercises/exercise.attribute.type.viewmodel";

@Injectable()
export class ActivitiesMapper {
	constructor(@Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	stubAttribute(value: string | undefined, field: string, { type, unit, unitConversion }: IStubAttributeOptions = {}): IExerciseActivityAttributeCreateViewModel | undefined {
		if (value) {
			const userId = this.storage.getUserId();
			const convertedValue = convertToUnit({
				value,
				unit,
				unitTo: unitConversion,
			});
			return this.entityActivityAttributeToViewModel({
				activity_id: "",
				attribute_type_id: "",
				id: "",
				value: convertedValue.value,
				unit: convertedValue.unit,
				user_id: userId,
				attribute_type: {
					id: "",
					user_id: userId,
					name: field,
					type: type ?? EnumAttributeType.Number,
				},
			});
		}
		return undefined;
	}

	entityToViewModel({ id, user_id, title, activity_type, created_at, updated_at, attributes = [], source, description, date_occurred }: IExerciseActivityModel, addMeta = true): IExerciseActivityViewModel {
		const response = {
			id,
			source,
			description,
			title,
			activityType: this.entityActivityTypeToViewModel(activity_type),
			attributes: attributes.map((attribute) => this.entityActivityAttributeToViewModel(attribute)),
			dateOccurred: date_occurred,
		};
		if (addMeta) {
			addMetaInfo(response, user_id, created_at, updated_at);
		}
		return response;
	}

	entityAttributeTypeToViewModel({ id, name, type, attributes, user_id, created_at, updated_at }: IExerciseAttributeTypesModel, addMeta = false): IExerciseAttributeTypeViewModel {
		const response = {
			id,
			name,
			type,
			attributes: attributes?.map((attribute) => this.entityActivityAttributeToViewModel(attribute)),
		};
		if (addMeta) {
			addMetaInfo(response, user_id, created_at, updated_at);
		}
		return response;
	}

	entityActivityAttributeToViewModel({ id, attribute_type, activity, unit_display, user_id, created_at, updated_at, value, unit }: IExerciseActivityAttributeModel, addMeta = false) {
		const localizedValue = localizeValue({
			value,
			unit,
			measurementSystem: this.storage.getMeasurementSystem(),
		});
		const response: IExerciseActivityAttributeViewModel = {
			id,
			value: localizedValue.value,
			unit: localizedValue.unit,
			activity: activity && this.entityToViewModel(activity),
			attributeType: this.entityAttributeTypeToViewModel(attribute_type),
		};
		if (unit_display) {
			const convertedValue = convertToUnit({
				value,
				unit,
				unitTo: unit_display,
			});
			response.unitDisplay = convertedValue.unit;
			response.valueDisplay = convertedValue.value;
		}
		if (addMeta) {
			addMetaInfo(response, user_id, created_at, updated_at);
		}
		return response;
	}

	entityActivityTypeToViewModel({ id, activities, user_id, name, created_at, updated_at }: IExerciseActivityTypesModel, addMeta = false): IExerciseActivityTypeViewModel {
		const response = {
			id,
			name,
			activities: activities?.map((activity) => this.entityToViewModel(activity)),
		};
		if (addMeta) {
			addMetaInfo(response, user_id, created_at, updated_at);
		}
		return response;
	}

	viewModelAttributeTypeToEntity({ userId, name, type }: IExerciseAttributeTypeCreateViewModel): IExerciseAttributeTypeCreate {
		return {
			name,
			type,
			user_id: userId ?? this.storage.getUserId(),
		};
	}

	viewModelActivityTypeToEntity({ name, userId }: IExerciseActivityTypeCreateViewModel): IExerciseActivityTypeCreate {
		return {
			name,
			user_id: userId ?? this.storage.getUserId(),
		};
	}

	viewModelActivityAttributesToEntity({ value, unit, unitDisplay, userId, attributeType }: IExerciseActivityAttributeCreateViewModel): IExerciseActivityAttributeCreate {
		const result = localizeValue({
			value,
			unit,
			reverse: true,
			measurementSystem: this.storage.getMeasurementSystem(),
		});
		return {
			unit: result.unit,
			value: result.value,
			// Appease TS... we'll be setting this when we have the value from the DB entry
			activity_id: "",
			// Appease TS... we'll be setting this when we have the value from the DB entry
			attribute_type_id: "",
			unit_display: unitDisplay,
			user_id: userId ?? this.storage.getUserId(),
			attribute_type: this.viewModelAttributeTypeToEntity(attributeType),
		};
	}

	viewModelToEntity({ userId, source, activityType, attributes, description, title, dateOccurred }: IExerciseActivityCreateViewModel): IExerciseActivityCreate {
		const defaultUserId = this.storage.getUserId();
		return {
			source,
			title,
			description,
			// Appease TS... we'll be setting this when we have the value from the DB entry
			activity_type_id: "",
			user_id: userId ?? defaultUserId,
			date_occurred: dateOccurred,
			activity_type: this.viewModelActivityTypeToEntity(activityType),
			attributes: attributes.map((attribute) => this.viewModelActivityAttributesToEntity(attribute)),
		};
	}

	stravaToViewModel(model: IUploadStrava): IExerciseActivityCreateViewModel {
		const userId = this.storage.getUserId();
		const attributes: (IExerciseActivityAttributeCreateViewModel | undefined)[] = [
			// Time should be stored in seconds
			this.stubAttribute(model["Start Time"], "Time Start", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.stubAttribute(model["Other Time"], "Time End", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.stubAttribute(model["Elapsed Time"], "Time Elapsed", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.stubAttribute(model["Moving Time"], "Time Moving", {
				unit: EnumUnitTypes.Seconds,
				unitConversion: EnumUnitTypes.Hours,
			}),
			this.stubAttribute(model["Distance"], "Distance", {
				unit: EnumUnitTypes.Kilometers,
			}),
			this.stubAttribute(model["Max Speed"], "Speed Max", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.stubAttribute(model["Average Speed"], "Speed Average", {
				unit: EnumUnitTypes.MetersPerSecond,
				unitConversion: EnumUnitTypes.KilometersPerHour,
			}),
			this.stubAttribute(model["Elevation Low"], "Elevation Low", {
				unit: EnumUnitTypes.Meters,
			}),
			this.stubAttribute(model["Elevation High"], "Elevation High", {
				unit: EnumUnitTypes.Meters,
			}),
			this.stubAttribute(model["Calories"], "Calories"),
		];

		return {
			userId,
			source: EnumActivitySource.Strava,
			dateOccurred: dateToUTC(model["Activity Date"]),
			title: model["Activity Name"],
			description: model["Activity Description"],
			activityType: {
				userId,
				name: model["Activity Type"],
			},
			attributes: attributes.filter((value) => value !== undefined),
		};
	}
}
