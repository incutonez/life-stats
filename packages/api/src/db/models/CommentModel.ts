import { Column, ForeignKey, Table } from "sequelize-typescript";
import { PrimaryKeyGuid } from "@/db/decorators";
import { ApplicationModel } from "@/db/models/ApplicationModel";
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

    @ForeignKey(() => ApplicationModel)
    @Column
    declare application_id?: string;

    @Column
    declare comment: string;
}
