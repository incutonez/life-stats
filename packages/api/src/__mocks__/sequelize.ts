import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { AllModels } from "@/db/models";

export const sequelize = new Sequelize({
	storage: ":memory:",
	dialect: SqliteDialect,
	models: AllModels,
	pool: {
		idle: Infinity,
		max: 1,
	},
});
