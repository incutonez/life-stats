import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, HasMany, Table } from "@sequelize/core/decorators-legacy";
import { PrimaryKeyGuid } from "@/db/decorators";
import { ApplicationModel } from "@/db/models/ApplicationModel";
import { BaseModel } from "@/db/models/BaseModel";

@Table({
	tableName: "companies",
	createdAt: "created_at",
	updatedAt: "updated_at",
})
export class CompanyModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	declare name: string;

	@HasMany(() => ApplicationModel, {
		foreignKey: "company_id",
		inverse: "company",
	})
	declare applications?: NonAttribute<ApplicationModel[]>;
}
