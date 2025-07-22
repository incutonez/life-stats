import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, NotNull } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable } from "@/db/decorators";
import { ActionModel } from "@/exercises/models/ActionModel";
import { ActivityModel } from "@/exercises/models/ActivityModel";
import { ModelInterface } from "@/types";

export type IActivityAction = ModelInterface<ActivityActionModel>;

@BaseTable(EnumTableNames.exerciseActivityActions)
export class ActivityActionModel extends ActionModel {
	@Attribute(DataTypes.STRING)
	@NotNull
	declare activity_id: string;

	@BelongsTo(() => ActivityModel, {
		foreignKey: "activity_id",
	})
	activity?: NonAttribute<ActivityModel>;
}
