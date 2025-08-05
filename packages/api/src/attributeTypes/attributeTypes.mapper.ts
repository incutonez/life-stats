import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { plainToInstance } from "class-transformer";
import { SessionStorageService } from "@/auth/session.storage.service";
import { EnumFeatures, SESSION_STORAGE } from "@/constants";
import { AttributeTypeModel, IAttributeType } from "@/db/models/AttributeTypeModel";
import { AttributesMapper } from "@/exercises/attributes/attributes.mapper";
import { addMetaInfo } from "@/utils";
import {
	AttributeTypeListViewModel,
	AttributeTypeViewModel,
	IAttributeTypeViewModel,
} from "@/viewModels/attribute.type.viewmodel";

@Injectable()
export class AttributeTypesMapper implements OnModuleInit {
	private activityAttributesMapper: AttributesMapper;

	constructor(
		@Inject(SESSION_STORAGE) private storage: SessionStorageService,
		private readonly moduleRef: ModuleRef,
	) {	}

	onModuleInit() {
		this.activityAttributesMapper = this.moduleRef.get(AttributesMapper, {
			strict: false,
		});
	}

	entityToListViewModel({ id, name, user_id, created_at, updated_at, feature, activity_attributes = [] }: AttributeTypeModel, addMeta = true): AttributeTypeListViewModel {
		const viewModel = plainToInstance(AttributeTypeListViewModel, {
			id,
			name,
			feature,
			attributes: activity_attributes.length,
		});
		if (addMeta) {
			addMetaInfo(viewModel, user_id, created_at, updated_at);
		}
		return viewModel;
	}

	entityToViewModel({ id, name, user_id, created_at, updated_at, feature, activity_attributes = [] }: AttributeTypeModel, addMeta = false): AttributeTypeViewModel {
		const viewModel = plainToInstance(AttributeTypeViewModel, {
			id,
			name,
			feature,
			activityAttributes: activity_attributes.length ? activity_attributes.map((attribute) => this.activityAttributesMapper.activityAttributeToViewModel(attribute)) : undefined,
		});
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
