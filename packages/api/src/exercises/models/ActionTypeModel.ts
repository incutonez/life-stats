import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, HasMany } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ActivityActionModel } from "@/exercises/models/ActivityActionModel";
import { RoutineActionModel } from "@/exercises/models/RoutineActionModel";
import { ModelInterface } from "@/types";

export type IActionTypeModel = ModelInterface<ActionTypeModel>;

@BaseTable(EnumTableNames.exerciseActivityActionTypes)
export class ActionTypeModel extends BaseModel {
	@PrimaryKeyGuid()
	id: string;

	@Attribute(DataTypes.STRING)
	name: string;

	@HasMany(() => ActivityActionModel, {
		foreignKey: "action_type_id",
		inverse: "action_type",
	})
	activities?: NonAttribute<ActivityActionModel[]>;

	@HasMany(() => RoutineActionModel, {
		foreignKey: "action_type_id",
		inverse: "action_type",
	})
	routines?: NonAttribute<RoutineActionModel[]>;
}
