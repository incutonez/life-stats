import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, NotNull } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ActivityActionTypeModel } from "@/exercises/models/ActivityActionTypeModel";
import { ActivityModel } from "@/exercises/models/ActivityModel";
import { ModelInterface } from "@/types";

export type IActivityActionModel = ModelInterface<ActivityActionModel>;

export type IActivityActionModelCreate = Omit<IActivityActionModel, "id">;

@BaseTable(EnumTableNames.exerciseActivityActions)
export class ActivityActionModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare activity_id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare action_type_id: string;

	@Attribute(DataTypes.INTEGER)
	declare order: number;

	@Attribute(DataTypes.STRING)
	declare value: string;

	@BelongsTo(() => ActivityModel, {
		foreignKey: "activity_id",
	})
	activity?: NonAttribute<ActivityModel>;

	@BelongsTo(() => ActivityActionTypeModel, {
		foreignKey: "action_type_id",
	})
	declare action_type: NonAttribute<ActivityActionTypeModel>;
}
