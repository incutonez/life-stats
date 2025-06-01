import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, HasMany, NotNull, Table } from "@sequelize/core/decorators-legacy";
import { CreatedAtField, EnumTableNames, UpdatedAtField } from "@/constants";
import { PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import {
	ExerciseActivityAttributeModel,
	IExerciseActivityAttributeCreate,
} from "@/db/models/ExerciseActivityAttributeModel";
import { ExerciseActivityTypesModel, IExerciseActivityTypeCreate } from "@/db/models/ExerciseActivityTypesModel";
import { EnumActivitySource } from "@/exercises/constants";
import { ModelInterface } from "@/types";

export type IExerciseActivityModel = ModelInterface<ExerciseActivityModel>;

export type IExerciseActivityCreate = Omit<IExerciseActivityModel, "id" | "activity_type" | "attributes"> & {
	activity_type: IExerciseActivityTypeCreate;
	attributes: IExerciseActivityAttributeCreate[];
};

@Table({
	tableName: EnumTableNames.ExerciseActivities,
	createdAt: CreatedAtField,
	updatedAt: UpdatedAtField,
})
export class ExerciseActivityModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	declare title: string;

	@Attribute(DataTypes.STRING)
	declare description?: string;

	@Attribute(DataTypes.ENUM(Object.values(EnumActivitySource)))
	declare source?: EnumActivitySource;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare activity_type_id: string;

	@Attribute(DataTypes.INTEGER)
	declare date_occurred: number;

	@HasMany(() => ExerciseActivityAttributeModel, {
		foreignKey: "activity_id",
		inverse: "activity",
	})
	declare attributes?: NonAttribute<ExerciseActivityAttributeModel[]>;

	@BelongsTo(() => ExerciseActivityTypesModel, {
		foreignKey: "activity_type_id",
	})
	declare activity_type: NonAttribute<ExerciseActivityTypesModel>;
}
