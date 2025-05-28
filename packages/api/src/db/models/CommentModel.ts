import { DataTypes } from "@sequelize/core";
import { Attribute, NotNull, Table } from "@sequelize/core/decorators-legacy";
import { PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ModelInterface } from "@/types";

export type ICommentModel = ModelInterface<CommentModel>;

export type ICommentCreateModel = Omit<ICommentModel, "id">;

@Table({
	tableName: "comments",
	createdAt: "created_at",
	updatedAt: "updated_at",
})
export class CommentModel extends BaseModel {
    @PrimaryKeyGuid()
    declare id: string;

		@Attribute(DataTypes.STRING)
    @NotNull
    declare application_id: string;

		@Attribute(DataTypes.STRING)
    declare comment: string;
}
