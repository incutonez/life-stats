import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, HasMany } from "@sequelize/core/decorators-legacy";
import { EnumFeatures, EnumTableNames } from "@/constants";
import { AttributeEnum, BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ActivityAttributeModel } from "@/exercises/models/ActivityAttributeModel";
import { ModelInterface } from "@/types";

export type IAttributeType = ModelInterface<AttributeTypeModel>;

@BaseTable(EnumTableNames.attributeTypes)
export class AttributeTypeModel extends BaseModel {
	@PrimaryKeyGuid()
	id: string;

	@Attribute(DataTypes.STRING)
	name: string;

	@AttributeEnum(EnumFeatures)
	feature: EnumFeatures;

	@HasMany(() => ActivityAttributeModel, {
		foreignKey: "attribute_type_id",
		inverse: "attribute_type",
	})
	activity_attributes?: NonAttribute<ActivityAttributeModel>[];
}
