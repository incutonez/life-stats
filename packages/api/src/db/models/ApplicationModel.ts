import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, HasMany, NotNull, Table } from "@sequelize/core/decorators-legacy";
import { PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { CommentModel } from "@/db/models/CommentModel";
import { CompanyModel } from "@/db/models/CompanyModel";
import { EnumApplicationStatus, ModelInterface } from "@/types";

export type IApplicationModel = ModelInterface<ApplicationModel>;

export type IApplicationUpdateModel = Omit<IApplicationModel, "comments" | "company">;

export type IApplicationCreateModel = Omit<IApplicationUpdateModel, "id">;

@Table({
	tableName: "applications",
	createdAt: "created_at",
	updatedAt: "updated_at",
})
export class ApplicationModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	declare position_title: string;

	@Attribute(DataTypes.INTEGER)
	declare date_applied: number;

	@Attribute(DataTypes.STRING)
	declare url: string;

	@Attribute(DataTypes.STRING)
	declare compensation: string;

	@Attribute(DataTypes.INTEGER)
	declare status: EnumApplicationStatus;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare company_id: string;

	@BelongsTo(() => CompanyModel, {
		foreignKey: "company_id",
	})
	declare company: NonAttribute<CompanyModel>;

	@HasMany(() => CommentModel, {
		foreignKey: "application_id",
	})
	declare comments: NonAttribute<CommentModel[]>;
}
