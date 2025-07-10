import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, HasMany } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ActivityActionModel } from "@/exercises/models/ActivityActionModel";
import { ModelInterface } from "@/types";

export type IActivityActionTypeModel = ModelInterface<ActivityActionTypeModel>;

@BaseTable(EnumTableNames.exerciseActivityActionTypes)
export class ActivityActionTypeModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	declare name: string;

	@HasMany(() => ActivityActionModel, {
		foreignKey: "action_type_id",
		inverse: "action_type",
	})
	actions?: NonAttribute<ActivityActionModel[]> = [];
}
