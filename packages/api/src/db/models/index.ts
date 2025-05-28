import { ApplicationModel } from "@/db/models/ApplicationModel";
import { AuditModel } from "@/db/models/AuditModel";
import { BaseModel } from "@/db/models/BaseModel";
import { CommentModel } from "@/db/models/CommentModel";
import { CompanyModel } from "@/db/models/CompanyModel";

export const AuditedModels = [ApplicationModel, CommentModel, CompanyModel];
export const NonAuditedModels = [AuditModel];

export function addAuditing() {
	AuditedModels.forEach((model) => {
		const table_name = model.modelDefinition.table.tableName;
		model.hooks.addListeners({
			afterCreate(instance: BaseModel) {
				AuditModel.create({
					table_name,
					user_id: instance.user_id,
					action: "insert",
					payload: JSON.stringify(instance.getPlain()),
				});
			},
			afterUpdate(instance: BaseModel) {
				AuditModel.create({
					table_name,
					user_id: instance.user_id,
					action: "update",
					payload: JSON.stringify(instance.getPlain()),
				});
			},
			afterDestroy(instance: BaseModel) {
				AuditModel.create({
					table_name,
					user_id: instance.user_id,
					action: "delete",
					payload: JSON.stringify(instance.getPlain()),
				});
			},
		});
	});
}
