import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, HasMany } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { RoutineActionModel } from "@/exercises/models/RoutineActionModel";
import { ModelInterface } from "@/types";

export type IRoutineModel = ModelInterface<RoutineModel>;

@BaseTable(EnumTableNames.exerciseRoutines)
export class RoutineModel extends BaseModel {
	@PrimaryKeyGuid()
	id: string;

	@Attribute(DataTypes.STRING)
	name: string;

	@HasMany(() => RoutineActionModel, {
		foreignKey: "routine_id",
		inverse: "routine",
	})
	actions?: NonAttribute<RoutineActionModel[]>;
}
