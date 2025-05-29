import { SqliteDialect } from "@sequelize/sqlite3";

// Per the docs, the CLI isn't ready in v7
// Source: https://sequelize.org/docs/v7/cli/
module.exports = {
	storage: "src/db/data.db",
	dialect: SqliteDialect,
	logging: false,
};
