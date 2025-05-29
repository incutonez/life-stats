import { DataTypes, Model } from "@sequelize/core";
import { Attribute, Table } from "@sequelize/core/decorators-legacy";
import { EnumAuditActionTypes } from "@/constants";
import { PrimaryKeyGuid } from "@/db/decorators";
import { ModelInterface } from "@/types";

export type IAuditModel = ModelInterface<AuditModel>;

@Table({
	tableName: "audits",
	createdAt: "created_at",
	updatedAt: false,
})
export class AuditModel extends Model {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	declare user_id: string;

	@Attribute(DataTypes.STRING)
	declare entity: string;

	@Attribute(DataTypes.ENUM(Object.values(EnumAuditActionTypes)))
	declare action: EnumAuditActionTypes;

	@Attribute(DataTypes.STRING)
	declare value_current?: string;

	@Attribute(DataTypes.STRING)
	declare value_previous?: string;

	@Attribute(DataTypes.DATE)
	declare created_at: Date;
}
