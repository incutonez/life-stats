import { rmSync } from "node:fs";
import * as process from "node:process";
import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { AppInfoViewModel } from "src/viewModels/app.info.viewmodel";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import { DataBaseStoragePath } from "@/constants";
import { encrypt, getDBPath } from "@/db/config";

@Injectable()
export class AppService implements OnApplicationShutdown {
	constructor(private sequelize: Sequelize) {
		// Only create the DB if it doesn't exist
		if (!fileExistsSync(DataBaseStoragePath)) {
			sequelize.sync();
		}
	}

	getInfo(): AppInfoViewModel {
		return {
			version: process.env.npm_package_version as string,
		};
	}

	async onApplicationShutdown() {
		const dbPath = getDBPath();
		if (dbPath && dbPath !== DataBaseStoragePath) {
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
