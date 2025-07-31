import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, NotNull } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ActionTypeModel } from "@/exercises/models/ActionTypeModel";
import { RoutineModel } from "@/exercises/models/RoutineModel";
import { ModelInterface } from "@/types";

export type IRoutineActionModel = ModelInterface<RoutineActionModel>;

export type IRoutineActionCreate = Omit<IRoutineActionModel, "id">;

@BaseTable(EnumTableNames.exerciseRoutinesActions)
export class RoutineActionModel extends BaseModel {
	@PrimaryKeyGuid()
	id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	routine_id: string;

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

	@BelongsTo(() => RoutineModel, {
		foreignKey: "routine_id",
	})
	routine?: NonAttribute<RoutineModel>;
}
