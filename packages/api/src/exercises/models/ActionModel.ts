import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, NotNull } from "@sequelize/core/decorators-legacy";
import { PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ActionTypeModel } from "@/exercises/models/ActionTypeModel";
import { ModelInterface } from "@/types";

export type IActionCreateModel = Omit<ModelInterface<ActionModel>, "id">;

export class ActionModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare action_type_id: string;

	@Attribute(DataTypes.INTEGER)
	declare order: number;

	@Attribute(DataTypes.STRING)
	declare value: string;

	@BelongsTo(() => ActionTypeModel, {
		foreignKey: "action_type_id",
	})
	declare action_type: NonAttribute<ActionTypeModel>;
}
