import { DataTypes, Model } from "@sequelize/core";
import { Attribute } from "@sequelize/core/decorators-legacy";
import { EnumAuditActionTypes, EnumFeatures, EnumTableNames } from "@/constants";
import { AttributeEnum, BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { ModelInterface } from "@/types";

export type IAuditModel = ModelInterface<AuditModel>;

@BaseTable({
	tableName: EnumTableNames.audits,
	updatedAt: false,
})
export class AuditModel extends Model {
	@PrimaryKeyGuid()
	id: string;

	@Attribute(DataTypes.STRING)
	user_id: string;

	@AttributeEnum(EnumTableNames)
	entity: EnumTableNames;

	@Attribute(DataTypes.STRING)
	entity_id: string;

	@AttributeEnum(EnumFeatures)
	feature: EnumFeatures;

	@Attribute(DataTypes.ENUM(Object.values(EnumAuditActionTypes)))
	action: EnumAuditActionTypes;

	@Attribute(DataTypes.STRING)
	value_current?: string;

	@Attribute(DataTypes.STRING)
	value_previous?: string;

	@Attribute(DataTypes.DATE)
	created_at: Date;
}
