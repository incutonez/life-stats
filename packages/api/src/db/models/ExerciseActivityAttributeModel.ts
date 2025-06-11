import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, NotNull } from "@sequelize/core/decorators-legacy";
import { EnumTableNames, EnumUnitTypes } from "@/constants";
import { AttributeEnum, BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { AttributeTypeModel, IAttributeTypeCreate } from "@/db/models/AttributeTypeModel";
import { BaseModel } from "@/db/models/BaseModel";
import { ExerciseActivityModel } from "@/db/models/ExerciseActivityModel";
import { ModelInterface } from "@/types";

export type IExerciseActivityAttributeModel = ModelInterface<ExerciseActivityAttributeModel>;

export type IExerciseActivityAttributeCreate = Omit<IExerciseActivityAttributeModel, "id" | "attribute_type"> & {
	attribute_type: IAttributeTypeCreate;
};

@BaseTable(EnumTableNames.ExerciseActivityAttributes)
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

	@AttributeEnum(EnumUnitTypes)
	declare unit?: EnumUnitTypes;

	@AttributeEnum(EnumUnitTypes)
	declare unit_display?: EnumUnitTypes;

	@BelongsTo(() => ExerciseActivityModel, {
		foreignKey: "activity_id",
	})
	declare activity?: NonAttribute<ExerciseActivityModel>;

	@BelongsTo(() => AttributeTypeModel, {
		foreignKey: "attribute_type_id",
	})
	declare attribute_type: NonAttribute<AttributeTypeModel>;
}
