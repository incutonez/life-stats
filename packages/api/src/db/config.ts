import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { ApplicationModel } from "@/db/models/ApplicationModel";
import { CommentModel } from "@/db/models/CommentModel";
import { CompanyModel } from "@/db/models/CompanyModel";

/* This is a function because if it was just a plain export, process.env.DATABASE_PATH would be undefined, as the env
 * file isn't processed before this global export would happen */
export function getDBConfig(): SequelizeModuleOptions {
	return {
		dialect: "sqlite",
		storage: process.env.DATABASE_PATH,
		host: "localhost",
		models: [ApplicationModel, CommentModel, CompanyModel],
		logging: false,
	};
}
