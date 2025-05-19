import * as process from "node:process";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import { ApplicationModel } from "@/db/models/ApplicationModel";
import { CommentModel } from "@/db/models/CommentModel";
import { CompanyModel } from "@/db/models/CompanyModel";
import { decrypt } from "@/encryption";

const storage = "src/db/data.db";

/* This is a function because if it was just a plain export, process.env.DATABASE_PATH would be undefined, as the env
 * file isn't processed before this global export would happen */
export function getDBConfig(): SequelizeModuleOptions {
	const { DATABASE_PATH, DATABASE_PASSWORD } = process.env;
	if (DATABASE_PASSWORD && DATABASE_PATH && DATABASE_PATH !== storage && !fileExistsSync(storage)) {
		decrypt(DATABASE_PATH);
	}
	return {
		storage,
		dialect: "sqlite",
		host: "localhost",
		models: [ApplicationModel, CommentModel, CompanyModel],
		logging: false,
	};
}
