import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, HasMany, Table } from "@sequelize/core/decorators-legacy";
import { CreatedAtField, EnumTableNames, UpdatedAtField } from "@/constants";
import { PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ExerciseActivityModel } from "@/db/models/ExerciseActivityModel";
import { ModelInterface } from "@/types";

export type IExerciseActivityTypesModel = ModelInterface<ExerciseActivityTypesModel>;

export type IExerciseActivityTypeCreate = Omit<IExerciseActivityTypesModel, "id">;

@Table({
	tableName: EnumTableNames.ExerciseActivityTypes,
	createdAt: CreatedAtField,
	updatedAt: UpdatedAtField,
})
export class ExerciseActivityTypesModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	declare name: string;

	@HasMany(() => ExerciseActivityModel, {
		foreignKey: "activity_type_id",
		inverse: "activity",
	})
	declare activities?: NonAttribute<ExerciseActivityModel[]>;
}
