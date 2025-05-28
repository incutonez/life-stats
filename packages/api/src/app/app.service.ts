import { rmSync } from "node:fs";
import * as process from "node:process";
import { env } from "node:process";
import { Inject, Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Sequelize } from "sequelize";
import { AppInfoViewModel } from "src/viewModels/app.info.viewmodel";
import { DataBaseStoragePath, SEQUELIZE } from "@/constants";
import { encrypt, getDBPath } from "@/db/config";

@Injectable()
export class AppService implements OnApplicationShutdown {
	constructor(@Inject(SEQUELIZE) private sequelize: Sequelize) {
	}

	getInfo(): AppInfoViewModel {
		return {
			version: env.npm_package_version as string,
		};
	}

	async onApplicationShutdown() {
		const dbPath = getDBPath();
		const { DATABASE_PERSIST, DATABASE_PATH } = env;
		if (dbPath && DATABASE_PERSIST !== "true" && DATABASE_PATH && DATABASE_PATH !== DataBaseStoragePath) {
			await encrypt(dbPath);
			// Make sure we close our sequelize connection before we remove the file
			await this.sequelize.close();
			// We remove the file because it's not encrypted at rest
			rmSync(DataBaseStoragePath, {
				force: true,
			});
		}
		process.exit(0);
	}
}
