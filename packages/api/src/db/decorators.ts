import { DataTypes } from "@sequelize/core";
import { Attribute, Table } from "@sequelize/core/decorators-legacy";
import { uuid } from "uuidv4";
import { CreatedAtField, EnumTableNames, UpdatedAtField } from "@/constants";

export function PrimaryKeyGuid() {
	return Attribute({
		type: DataTypes.UUID,
		defaultValue: () => uuid(),
		primaryKey: true,
		allowNull: false,
	});
}

export function BaseTable(tableName: EnumTableNames) {
	return Table({
		tableName,
		createdAt: CreatedAtField,
		updatedAt: UpdatedAtField,
	});
}
