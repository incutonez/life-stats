import { CreationOptional, DataTypes, Model } from "@sequelize/core";
import { Attribute } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable, ForeignKeyGuid, PrimaryKeyGuid } from "@/db/decorators";

@BaseTable(EnumTableNames.jobApplicationsLinked)
export class ApplicationLinkedModel extends Model {
	@PrimaryKeyGuid()
	id: string;

	@ForeignKeyGuid()
	linked_id: string;

	@ForeignKeyGuid()
	link_id: string;

	@Attribute(DataTypes.DATE)
	created_at?: CreationOptional<Date>;

	@Attribute(DataTypes.DATE)
	updated_at?: CreationOptional<Date>;
}
