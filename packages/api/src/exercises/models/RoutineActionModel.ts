import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, NotNull } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable } from "@/db/decorators";
import { ActionModel } from "@/exercises/models/ActionModel";
import { RoutineModel } from "@/exercises/models/RoutineModel";
import { ModelInterface } from "@/types";

export type IRoutineActionModel = ModelInterface<RoutineActionModel>;

export type IRoutineActionCreate = Omit<IRoutineActionModel, "id">;

@BaseTable(EnumTableNames.exerciseRoutinesActions)
export class RoutineActionModel extends ActionModel {
	@Attribute(DataTypes.STRING)
	@NotNull
	declare routine_id: string;

	@BelongsTo(() => RoutineModel, {
		foreignKey: "routine_id",
	})
	routine?: NonAttribute<RoutineModel>;
}
