import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, NotNull } from "@sequelize/core/decorators-legacy";
import { EnumTableNames, EnumUnitTypes } from "@/constants";
import { AttributeEnum, BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { AttributeTypeModel } from "@/db/models/AttributeTypeModel";
import { BaseModel } from "@/db/models/BaseModel";
import { ActivityModel } from "@/exercises/models/ActivityModel";
import { ModelInterface } from "@/types";

export type IActivityAttributeModel = ModelInterface<ActivityAttributeModel>;

@BaseTable(EnumTableNames.exerciseActivityAttributes)
export class ActivityAttributeModel extends BaseModel {
	@PrimaryKeyGuid()
	id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	activity_id: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	attribute_type_id: string;

	@Attribute(DataTypes.STRING)
	value: string;

	@AttributeEnum(EnumUnitTypes)
	unit?: EnumUnitTypes;

	@AttributeEnum(EnumUnitTypes)
	unit_display?: EnumUnitTypes;

	@BelongsTo(() => ActivityModel, {
		foreignKey: "activity_id",
	})
	activity?: NonAttribute<ActivityModel>;

	@BelongsTo(() => AttributeTypeModel, {
		foreignKey: "attribute_type_id",
	})
	attribute_type?: NonAttribute<AttributeTypeModel>;
}
