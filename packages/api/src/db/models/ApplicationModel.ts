import { BelongsTo, Column, ForeignKey, HasMany, Table } from "sequelize-typescript";
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

	@Column
	declare position_title: string;

	@Column
	declare date_applied: number;

	@Column
	declare url: string;

	@Column
	declare compensation: string;

	@Column
	declare status: EnumApplicationStatus;

	@ForeignKey(() => CompanyModel)
	@Column
	declare company_id: string;

	@BelongsTo(() => CompanyModel, "company_id")
	declare company: CompanyModel;

	@HasMany(() => CommentModel, "application_id")
	declare comments: CommentModel[];
}
