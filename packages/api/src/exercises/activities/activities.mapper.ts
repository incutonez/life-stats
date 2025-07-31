import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { plainToInstance } from "class-transformer";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActionsMapper } from "@/exercises/actions/actions.mapper";
import { AttributesMapper } from "@/exercises/attributes/attributes.mapper";
import { ActivityModel, IActivityUpdateModel } from "@/exercises/models/ActivityModel";
import { ActivityTypeModel, IActivityTypeCreate } from "@/exercises/models/ActivityTypeModel";
import { IActivityTypeCreateViewModel, IActivityTypeViewModel } from "@/exercises/viewModels/activity.type.viewmodel";
import { ActivityViewModel, IActivityViewModel } from "@/exercises/viewModels/activity.viewmodel";
import { addMetaInfo } from "@/utils";

@Injectable()
export class ActivitiesMapper implements OnModuleInit {
	private attributesMapper: AttributesMapper;

	constructor(
		@Inject(SESSION_STORAGE) private readonly storage: SessionStorageService,
		private readonly actionsMapper: ActionsMapper,
		private readonly moduleRef: ModuleRef,
	) {	}

	onModuleInit() {
		this.attributesMapper = this.moduleRef.get(AttributesMapper, {
			strict: false,
		});
	}

	entityToViewModel({ id, user_id, actions = [], calories, weight_lost, duration, weight, source_id, title, activity_type, created_at, updated_at, attributes = [], source, description, date_occurred }: ActivityModel, addMeta = true) {
		const response = plainToInstance(ActivityViewModel, {
			id,
			source,
			description,
			title,
			weight,
			duration,
			calories,
			weightLost: weight_lost,
			sourceId: source_id,
			activityType: activity_type && this.entityActivityTypeToViewModel(activity_type),
			attributes: attributes.length ? attributes.map((attribute) => this.attributesMapper.activityAttributeToViewModel(attribute)) : undefined,
			actions: actions.length ? actions.map((action) => this.actionsMapper.actionToViewModel(action)) : undefined,
			dateOccurred: date_occurred,
		});
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

	viewModelToEntity({ userId, duration, weight = this.storage.getUserSettings().exercises.weight, source, sourceId, activityType, description, title, dateOccurred }: IActivityViewModel): IActivityUpdateModel {
		const defaultUserId = this.storage.getUserId();
		return {
			source,
			title,
			description,
			weight,
			duration,
			source_id: sourceId,
			activity_type_id: activityType!.id!,
			user_id: userId ?? defaultUserId,
			date_occurred: dateOccurred,
		};
	}
}
