import { Inject, Injectable } from "@nestjs/common";
import { AuthStorageService } from "@/auth/auth.storage.service";
import { AUTH_STORAGE, EnumUnitTypes } from "@/constants";
import {
	IExerciseActivityAttributeCreate,
	IExerciseActivityAttributeModel,
} from "@/db/models/ExerciseActivityAttributeModel";
import { IExerciseActivityCreate, IExerciseActivityModel } from "@/db/models/ExerciseActivityModel";
import { IExerciseActivityTypesModel } from "@/db/models/ExerciseActivityTypesModel";
import { IExerciseAttributeTypesModel } from "@/db/models/ExerciseAttributeTypesModel";
import { EnumActivitySource, EnumAttributeType } from "@/exercises/constants";
import { IStubAttributeOptions, IUploadStrava } from "@/exercises/types";
import { addMetaInfo } from "@/utils";
import { IExerciseActivityAttributeViewModel } from "@/viewModels/exercises/exercise.activity.attribute.viewmodel";
import { IExerciseActivityTypeViewModel } from "@/viewModels/exercises/exercise.activity.type.viewmodel";
import { IExerciseActivityViewModel } from "@/viewModels/exercises/exercise.activity.viewmodel";
import { IExerciseAttributeTypeViewModel } from "@/viewModels/exercises/exercise.attribute.type.viewmodel";

@Injectable()
export class ActivitiesMapper {
	constructor(@Inject(AUTH_STORAGE) private readonly storage: AuthStorageService) {
	}

	stubAttribute(value: string | undefined, field: string, { type, unit }: IStubAttributeOptions = {}) {
		type ??= EnumAttributeType.Number;

		if (value) {
			const userId = this.storage.getUserId();
			return {
				user_id: userId,
				attribute_type_id: "",
				activity_id: "",
				value,
				unit,
				attribute_type: {
					type,
					name: field,
					user_id: userId,
				},
			};
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

	entityActivityAttributeToViewModel({ id, attribute_type, activity, user_id, created_at, updated_at, value, unit }: IExerciseActivityAttributeModel, addMeta = false): IExerciseActivityAttributeViewModel {
		const response = {
			id,
			value,
			unit,
			activity: activity && this.entityToViewModel(activity),
			attributeType: this.entityAttributeTypeToViewModel(attribute_type),
		};
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

	stravaToEntity(model: IUploadStrava): IExerciseActivityCreate {
		const userId = this.storage.getUserId();
		const attributes: (IExerciseActivityAttributeCreate | undefined)[] = [
			// Time should be stored in seconds
			this.stubAttribute(model["Start Time"], "Time Start", {
				unit: EnumUnitTypes.Seconds,
			}),
			this.stubAttribute(model["Other Time"], "Time End", {
				unit: EnumUnitTypes.Seconds,
			}),
			this.stubAttribute(model["Elapsed Time"], "Time Elapsed", {
				unit: EnumUnitTypes.Seconds,
			}),
			this.stubAttribute(model["Moving Time"], "Time Moving", {
				unit: EnumUnitTypes.Seconds,
			}),
			this.stubAttribute(model["Distance"], "Distance", {
				unit: EnumUnitTypes.Kilometers,
			}),
			this.stubAttribute(model["Max Speed"], "Speed Max", {
				unit: EnumUnitTypes.MetersPerSecond,
			}),
			this.stubAttribute(model["Average Speed"], "Speed Average", {
				unit: EnumUnitTypes.MetersPerSecond,
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
			source: EnumActivitySource.Strava,
			user_id: userId,
			date_occurred: new Date(model["Activity Date"]).getTime(),
			title: model["Activity Name"],
			description: model["Activity Description"],
			activity_type_id: "",
			activity_type: {
				user_id: userId,
				name: model["Activity Type"],
			},
			attributes: attributes.filter((value) => value !== undefined),
		};
	}
}
