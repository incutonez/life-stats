import { CreatedAtField, EnumAuditActionTypes, EnumFeatures, UpdatedAtField } from "@/constants";
import { ApplicationModel } from "@/db/models/ApplicationModel";
import { AuditModel } from "@/db/models/AuditModel";
import { BaseModel } from "@/db/models/BaseModel";
import { CommentModel } from "@/db/models/CommentModel";
import { CompanyModel } from "@/db/models/CompanyModel";
import { isObject } from "@/utils";

export const JobModels = [ApplicationModel, CommentModel, CompanyModel];
export const ExerciseModels = [];
export const AuditedFeatures = [{
	models: JobModels,
	feature: EnumFeatures.jobs,
}, {
	models: ExerciseModels,
	feature: EnumFeatures.exercises,
}];
export const AllModels = [...JobModels, ...ExerciseModels, AuditModel];

function sanitizeDataType(value: any) {
	if (Array.isArray(value)) {
		value.forEach((item: any) => sanitizeDataType(item));
	}
	else if (isObject(value)) {
		sanitizeData(value);
	}
}

function sanitizeData(data: Record<string, unknown>) {
	for (const key in data) {
		sanitizeDataType(data[key]);
	}
	delete data[CreatedAtField];
	delete data[UpdatedAtField];
	return data;
}

function getChanges(instance: BaseModel) {
	const changed = instance.changed();
	let valueCurrent: Record<string, unknown> = {};
	let valuePrevious: Record<string, unknown> = {};
	if (changed) {
		for (const field of changed) {
			if (field === UpdatedAtField) {
				continue;
			}
			valueCurrent[field] = instance.getDataValue(field);
			valuePrevious[field] = instance.previous(field);
		}
	}
	else {
		valuePrevious = sanitizeData(instance.previous());
		valueCurrent = sanitizeData(instance.getPlain());
	}

	return {
		value_current: Object.keys(valueCurrent).length ? JSON.stringify(valueCurrent, null, 2) : "",
		value_previous: Object.keys(valuePrevious).length ? JSON.stringify(valuePrevious, null, 2) : "",
	};
}

export function addAuditing() {
	AuditedFeatures.forEach(({ models, feature }) => {
		models.forEach((model) => {
			const table_name = model.modelDefinition.table.tableName;
			model.hooks.addListeners({
				afterCreate(instance: BaseModel) {
					const { value_current } = getChanges(instance);
					AuditModel.create({
						value_current,
						feature,
						entity: `${table_name}/${instance.get("id")}`,
						user_id: instance.user_id,
						action: EnumAuditActionTypes.created,
					});
				},
				afterUpdate(instance: BaseModel) {
					const { value_previous, value_current } = getChanges(instance);
					// Only add an update if we have a non-empty object
					if (value_current) {
						AuditModel.create({
							value_previous,
							value_current,
							feature,
							entity: `${table_name}/${instance.get("id")}`,
							user_id: instance.user_id,
							action: EnumAuditActionTypes.updated,
						});
					}
				},
				afterDestroy(instance: BaseModel) {
					const { value_current } = getChanges(instance);
					AuditModel.create({
						table_name,
						feature,
						entity: `${table_name}/${instance.get("id")}`,
						value_previous: value_current,
						user_id: instance.user_id,
						action: EnumAuditActionTypes.deleted,
					});
				},
			});
		});
	});
}
