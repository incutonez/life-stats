import { Inject, Injectable } from "@nestjs/common";
import { AttributeTypesMapper } from "@/attributeTypes/attributeTypes.mapper";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActivityAttributeModel, IActivityAttributeModel } from "@/exercises/models/ActivityAttributeModel";
import {
	ActivityAttributeViewModel,
	IActivityAttributeViewModel,
} from "@/exercises/viewModels/activity.attribute.viewmodel";
import { addMetaInfo, convertToUnit, localizeValue } from "@/utils";

@Injectable()
export class AttributesMapper {
	constructor(@Inject(SESSION_STORAGE) private readonly storage: SessionStorageService, private readonly attributeTypesMapper: AttributeTypesMapper) {
	}

	activityAttributeNestedToViewModel({ id, attribute_type, unit_display, user_id, created_at, updated_at, value, unit }: ActivityAttributeModel, addMeta = false) {
		const localizedValue = localizeValue({
			value,
			unit,
			round: true,
			measurementSystem: this.storage.getMeasurementSystem(),
		});
		const response: IActivityAttributeViewModel = {
			id,
			value: localizedValue.value,
			unit: localizedValue.unit,
			attributeType: this.attributeTypesMapper.entityToViewModel(attribute_type),
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

	activityAttributeToEntity({ id, value, unit, unitDisplay, activity, userId, attributeType }: ActivityAttributeViewModel, activityId = activity?.id): IActivityAttributeModel {
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
			attribute_type_id: attributeType.id,
			unit_display: unitDisplay,
			user_id: userId ?? this.storage.getUserId(),
			attribute_type: this.attributeTypesMapper.viewModelToEntity(attributeType),
		};
	}
}
