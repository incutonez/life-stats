import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { EnumFeatures, SESSION_STORAGE } from "@/constants";
import { ActionsMapper } from "@/exercises/actions/actions.mapper";
import { AttributesMapper } from "@/exercises/attributes/attributes.mapper";
import { EnumActivitySource } from "@/exercises/constants";
import { ActivityModel, IActivityUpdateModel } from "@/exercises/models/ActivityModel";
import { ActivityTypeModel, IActivityTypeCreate } from "@/exercises/models/ActivityTypeModel";
import { IStubAttributeOptions } from "@/exercises/types";
import { IActivityAttributeViewModel } from "@/exercises/viewModels/activity.attribute.viewmodel";
import { IActivityTypeCreateViewModel, IActivityTypeViewModel } from "@/exercises/viewModels/activity.type.viewmodel";
import { IActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { addMetaInfo, convertToUnit, localizeValue } from "@/utils";

@Injectable()
export class ActivitiesMapper {
	constructor(
		@Inject(SESSION_STORAGE) private readonly storage: SessionStorageService,
		private readonly actionsMapper: ActionsMapper,
		private readonly attributesMapper: AttributesMapper,
	) {	}

	stubAttribute(value: string | undefined, field: string, { unit, unitConversion }: IStubAttributeOptions = {}): IActivityAttributeViewModel | undefined {
		if (value) {
			const userId = this.storage.getUserId();
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
				userId: userId,
				attributeType: {
					id: "",
					userId: userId,
					name: field,
					feature: EnumFeatures.exercises,
				},
			};
		}
		return undefined;
	}

	entityToViewModel({ id, user_id, actions = [], calories, weight_lost, duration, weight, source_id, title, activity_type, created_at, updated_at, attributes = [], source, description, date_occurred }: ActivityModel, addMeta = true): IActivityViewModel {
		const response = {
			id,
			source,
			description,
			title,
			weight,
			duration,
			calories,
			weightLost: weight_lost,
			sourceId: source_id,
			activityType: this.entityActivityTypeToViewModel(activity_type),
			attributes: attributes.map((attribute) => this.attributesMapper.activityAttributeNestedToViewModel(attribute)),
			actions: actions.map((action) => this.actionsMapper.actionToViewModel(action)),
			dateOccurred: date_occurred,
		};
		if (addMeta) {
			addMetaInfo(response, user_id, created_at, updated_at);
		}
		return response;
	}

	entityActivityTypeToViewModel({ id, activities, user_id, name, created_at, updated_at }: ActivityTypeModel, addMeta = false): IActivityTypeViewModel {
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

	viewModelCreateActivityTypeToEntity({ name, userId }: IActivityTypeCreateViewModel): IActivityTypeCreate {
		return {
			name,
			user_id: userId ?? this.storage.getUserId(),
		};
	}

	viewModelToEntity({ id, userId, duration, weight = this.storage.getUserSettings().exercises.weight, source = EnumActivitySource.None, sourceId, activityType, description, title, dateOccurred }: IActivityViewModel): IActivityUpdateModel {
		const defaultUserId = this.storage.getUserId();
		sourceId = source === EnumActivitySource.None ? "" : sourceId;
		return {
			id,
			source,
			title,
			description,
			weight,
			duration,
			source_id: sourceId,
			activity_type_id: activityType.id,
			user_id: userId ?? defaultUserId,
			date_occurred: dateOccurred,
		};
	}
}
