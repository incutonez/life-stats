import * as process from "node:process";
import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { AppInfoViewModel } from "src/viewModels/app.info.viewmodel";
import { DataBaseStoragePath, encrypt } from "@/db/config";

@Injectable()
export class AppService implements OnApplicationShutdown {
	constructor(private sequelize: Sequelize) {
		sequelize.sync();
	}

	getInfo(): AppInfoViewModel {
		return {
			version: process.env.npm_package_version as string,
		};
	}

	onApplicationShutdown() {
		const { DATABASE_PATH } = process.env;
		if (DATABASE_PATH && DATABASE_PATH !== DataBaseStoragePath) {
			encrypt(DATABASE_PATH);
		}
	}
}
