import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, NotNull } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ActionTypeModel } from "@/exercises/models/ActionTypeModel";
import { ActivityModel } from "@/exercises/models/ActivityModel";
import { ModelInterface } from "@/types";

export type IActivityAction = ModelInterface<ActivityActionModel>;

export type IActivityActionCreate = Omit<IActivityAction, "id">;

@BaseTable(EnumTableNames.exerciseActivityActions)
export class ActivityActionModel extends BaseModel {
	@PrimaryKeyGuid()
	id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	activity_id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	action_type_id: string;

	@Attribute(DataTypes.INTEGER)
	order: number;

	@Attribute(DataTypes.STRING)
	value: string;

	@BelongsTo(() => ActionTypeModel, {
		foreignKey: "action_type_id",
	})
	action_type: NonAttribute<ActionTypeModel>;

	@BelongsTo(() => ActivityModel, {
		foreignKey: "activity_id",
	})
	activity?: NonAttribute<ActivityModel>;
}
