import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { plainToInstance } from "class-transformer";
import { AttributeTypesMapper } from "@/attributeTypes/attributeTypes.mapper";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActivitiesMapper } from "@/exercises/activities/activities.mapper";
import { ActivityAttributeModel, IActivityAttributeModel } from "@/exercises/models/ActivityAttributeModel";
import { ActivityAttributeViewModel } from "@/exercises/viewModels/activity.attribute.viewmodel";
import { addMetaInfo, convertToUnit, localizeValue } from "@/utils";

@Injectable()
export class AttributesMapper implements OnModuleInit {
	private attributeTypesMapper: AttributeTypesMapper;

	private activitiesMapper: ActivitiesMapper;

	constructor(
		@Inject(SESSION_STORAGE) private readonly storage: SessionStorageService,
		private readonly moduleRef: ModuleRef,
	) {	}

	onModuleInit() {
		this.attributeTypesMapper = this.moduleRef.get(AttributeTypesMapper, {
			strict: false,
		});
		this.activitiesMapper = this.moduleRef.get(ActivitiesMapper, {
			strict: false,
		});
	}

	activityAttributeToViewModel({ id, activity, attribute_type, unit_display, user_id, created_at, updated_at, value, unit }: ActivityAttributeModel, addMeta = false): ActivityAttributeViewModel {
		const localizedValue = localizeValue({
			value,
			unit,
			round: true,
			measurementSystem: this.storage.getMeasurementSystem(),
		});
		const response = plainToInstance(ActivityAttributeViewModel, {
			id,
			value: localizedValue.value,
			unit: localizedValue.unit,
			activity: activity && this.activitiesMapper.entityToViewModel(activity, false),
			attributeType: attribute_type && this.attributeTypesMapper.entityToViewModel(attribute_type),
		});
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

	activityAttributeToEntity({ id = "", value, unit, unitDisplay, activity, userId, attributeType }: ActivityAttributeViewModel, activityId = activity?.id): IActivityAttributeModel {
		const result = localizeValue({
			value,
			unit,
			round: true,
			reverse: true,
			measurementSystem: this.storage.getMeasurementSystem(),
		});
		return {
			id,
			unit: result.unit,
			value: result.value,
			activity_id: activityId!,
			attribute_type_id: attributeType!.id!,
			unit_display: unitDisplay,
			user_id: userId ?? this.storage.getUserId(),
			attribute_type: this.attributeTypesMapper.attributeTypeToEntity(attributeType!),
		};
	}
}
