import * as process from "node:process";
import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { AppInfoViewModel } from "src/viewModels/app.info.viewmodel";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import { DataBaseStoragePath, encrypt, getDBPath } from "@/db/config";

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
			// Close the Sequelize connection, as we're going to delete the data.db file in encrypt
			await this.sequelize.close();
			await encrypt(dbPath);
		}
	}
}
