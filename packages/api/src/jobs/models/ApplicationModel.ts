﻿import { BelongsToManySetAssociationsMixin, DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, BelongsToMany, HasMany } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { AttributeEnum, BaseTable, ForeignKeyGuid, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { EnumApplicationStatus, EnumLocationTypes } from "@/jobs/constants";
import { ApplicationLinkedModel } from "@/jobs/models/ApplicationLinkedModel";
import { CommentModel } from "@/jobs/models/CommentModel";
import { CompanyModel } from "@/jobs/models/CompanyModel";
import { ModelInterface } from "@/types";

export type IApplicationModel = ModelInterface<ApplicationModel>;

export type IApplicationUpdateModel = Omit<IApplicationModel, "comments" | "company">;

export type IApplicationCreateModel = Omit<IApplicationUpdateModel, "id">;

@BaseTable(EnumTableNames.jobApplications)
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

	@AttributeEnum(EnumApplicationStatus)
	declare status: EnumApplicationStatus;

	@AttributeEnum(EnumLocationTypes)
	declare location_type: EnumLocationTypes;

	@ForeignKeyGuid()
	declare company_id: string;

	@BelongsTo(() => CompanyModel, {
		foreignKey: "company_id",
	})
	declare company: NonAttribute<CompanyModel>;

	@HasMany(() => CommentModel, {
		foreignKey: "application_id",
	})
	declare comments: NonAttribute<CommentModel[]>;

	@BelongsToMany(() => ApplicationModel, {
		through: {
			model: ApplicationLinkedModel,
		},
		inverse: {
			as: "links",
		},
		foreignKey: "linked_id",
		otherKey: "link_id",
	})
	declare linked?: NonAttribute<ApplicationModel[]>;

	declare links?: NonAttribute<ApplicationModel[]>;

	declare setLinks: BelongsToManySetAssociationsMixin<ApplicationModel, ApplicationModel["id"]>;

	declare setLinked: BelongsToManySetAssociationsMixin<ApplicationModel, ApplicationModel["id"]>;
}
