import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, NotNull, Table, ValidateAttribute } from "@sequelize/core/decorators-legacy";
import { CreatedAtField, EnumTableNames, EnumUnitTypes, UpdatedAtField } from "@/constants";
import { PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ExerciseActivityModel } from "@/db/models/ExerciseActivityModel";
import { ExerciseAttributeTypesModel, IExerciseAttributeTypeCreate } from "@/db/models/ExerciseAttributeTypesModel";
import { ModelInterface } from "@/types";

export type IExerciseActivityAttributeModel = ModelInterface<ExerciseActivityAttributeModel>;

export type IExerciseActivityAttributeCreate = Omit<IExerciseActivityAttributeModel, "id" | "attribute_type"> & {
	attribute_type: IExerciseAttributeTypeCreate;
};

@Table({
	tableName: EnumTableNames.ExerciseActivityAttributes,
	createdAt: CreatedAtField,
	updatedAt: UpdatedAtField,
})
export class ExerciseActivityAttributeModel extends BaseModel {
	@PrimaryKeyGuid()
	declare id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare activity_id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	declare attribute_type_id: string;

	@Attribute(DataTypes.STRING)
	declare value: string;

	@Attribute(DataTypes.INTEGER)
	@ValidateAttribute({
		validator(value: EnumUnitTypes) {
			if (!Object.values(EnumUnitTypes).includes(value)) {
				throw new Error("value not in EnumUnitTypes");
			}
		},
	})
	declare unit?: EnumUnitTypes;

	@Attribute(DataTypes.INTEGER)
	@ValidateAttribute({
		validator(value: EnumUnitTypes) {
			if (!Object.values(EnumUnitTypes).includes(value)) {
				throw new Error("value not in EnumUnitTypes");
			}
		},
	})
	declare unit_display?: EnumUnitTypes;

	@BelongsTo(() => ExerciseActivityModel, {
		foreignKey: "activity_id",
	})
	declare activity?: NonAttribute<ExerciseActivityModel>;

	@BelongsTo(() => ExerciseAttributeTypesModel, {
		foreignKey: "attribute_type_id",
	})
	declare attribute_type: NonAttribute<ExerciseAttributeTypesModel>;
}
