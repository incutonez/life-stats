import { DataTypes, ValidationErrorItem } from "@sequelize/core";
import { Attribute, Table } from "@sequelize/core/decorators-legacy";
import { isUUID } from "class-validator";
import { v4 as uuid } from "uuid";
import { CreatedAtField, EnumTableNames, getTableName, UpdatedAtField } from "@/constants";

export class UUID extends DataTypes.ABSTRACT<string> {
	sanitize(value?: string) {
		if (value === "" || value === undefined || value === null) {
			value = uuid();
		}
		return value;
	}

	validate(value?: string) {
		if (typeof value !== "string" || !isUUID(value, "4")) {
			ValidationErrorItem.throwDataTypeValidationError(`${value} is not a valid uuid (version: 4)`);
		}
	}

	// toSql must return the SQL that will be used in a CREATE TABLE statement.
	toSql() {
		return "UUID";
	}
}

export function PrimaryKeyGuid() {
	return Attribute({
		type: UUID,
		primaryKey: true,
		allowNull: false,
		defaultValue: () => uuid(),
	});
}

export function ForeignKeyGuid() {
	return Attribute({
		type: UUID,
		allowNull: false,
	});
}

export interface IBaseTable {
	tableName: EnumTableNames;
	createdAt?: typeof CreatedAtField | false;
	updatedAt?: typeof UpdatedAtField | false;
}

export function BaseTable(options: EnumTableNames | IBaseTable) {
	if (typeof options === "number") {
		options = {
			tableName: options,
		};
	}
	const { tableName, createdAt = CreatedAtField, updatedAt = UpdatedAtField } = options;
	return Table({
		tableName: getTableName(tableName),
		createdAt,
		updatedAt,
	});
}

/**
 * The normal validator for enums relies on the key being a string, but sometimes we have keys being numbers, and
 * that's what this decorator solves... adds validation to make sure the values contain the value
 */
export function AttributeEnum<T extends Record<string, number>>(values: T) {
	return Attribute({
		type: DataTypes.INTEGER,
		validate: {
			validator(value: T[keyof T]) {
				if (!(value === 0 || !!value) && !Object.values(values).includes(value)) {
					throw new Error("value not in EnumUnitTypes");
				}
			},
		},
	});
}
