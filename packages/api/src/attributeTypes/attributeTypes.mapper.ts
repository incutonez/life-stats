import { Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { EnumFeatures, SESSION_STORAGE } from "@/constants";
import { IAttributeType } from "@/db/models/AttributeTypeModel";
import { addMetaInfo } from "@/utils";
import { IAttributeTypeViewModel } from "@/viewModels/attribute.type.viewmodel";

@Injectable()
export class AttributeTypesMapper {
	constructor(@Inject(SESSION_STORAGE) private storage: SessionStorageService) {
	}

	entityToViewModel({ id, name, user_id, created_at, updated_at, feature }: IAttributeType, addMeta = false) {
		const viewModel: IAttributeTypeViewModel = {
			id,
			name,
			feature,
		};
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	attributeTypeToEntity({ userId, id = "", name, feature = EnumFeatures.exercises }: IAttributeTypeViewModel): IAttributeType {
		return {
			id,
			name,
			feature,
			user_id: userId ?? this.storage.getUserId(),
		};
	}
}
