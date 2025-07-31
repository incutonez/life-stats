import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { AllModels } from "@/db/models";

export async function useSequelizeTest() {
	const sequelize = new Sequelize({
		storage: ":memory:",
		dialect: SqliteDialect,
		models: AllModels,
		pool: {
			idle: Infinity,
			max: 1,
		},
	});

	await sequelize.sync();

	return sequelize;
}
