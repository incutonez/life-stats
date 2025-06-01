import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, HasMany, Table } from "@sequelize/core/decorators-legacy";
import { CreatedAtField, EnumTableNames, UpdatedAtField } from "@/constants";
import { PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ExerciseActivityAttributeModel } from "@/db/models/ExerciseActivityAttributeModel";
import { EnumAttributeType } from "@/exercises/constants";
import { ModelInterface } from "@/types";

export type IExerciseAttributeTypesModel = ModelInterface<ExerciseAttributeTypesModel>;

export type IExerciseAttributeTypeCreate = Omit<IExerciseAttributeTypesModel, "id">;

@Table({
	tableName: EnumTableNames.ExerciseAttributeTypes,
	createdAt: CreatedAtField,
	updatedAt: UpdatedAtField,
})
export class ExerciseAttributeTypesModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	declare name: string;

	@Attribute(DataTypes.ENUM(Object.values(EnumAttributeType)))
	declare type: EnumAttributeType;

	@HasMany(() => ExerciseActivityAttributeModel, {
		foreignKey: "attribute_type_id",
		inverse: "attribute_type",
	})
	declare attributes?: NonAttribute<ExerciseActivityAttributeModel[]>;
}
