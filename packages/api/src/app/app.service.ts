import { Injectable } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { AppInfoViewModel } from "src/viewModels/app.info.viewmodel";

@Injectable()
export class AppService {
	constructor(private sequelize: Sequelize) {
		sequelize.sync();
	}

	getInfo(): AppInfoViewModel {
		return {
			version: process.env.npm_package_version as string,
		};
	}
}
