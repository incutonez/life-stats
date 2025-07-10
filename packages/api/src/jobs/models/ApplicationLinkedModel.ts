import { CreationOptional, DataTypes, Model } from "@sequelize/core";
import { Attribute } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable, ForeignKeyGuid, PrimaryKeyGuid } from "@/db/decorators";

@BaseTable(EnumTableNames.jobApplicationsLinked)
export class ApplicationLinkedModel extends Model {
	@PrimaryKeyGuid()
	declare id: string;

	@ForeignKeyGuid()
	declare linked_id: string;

	@ForeignKeyGuid()
	declare link_id: string;

	@Attribute(DataTypes.DATE)
	declare created_at?: CreationOptional<Date>;

	@Attribute(DataTypes.DATE)
	declare updated_at?: CreationOptional<Date>;
}
