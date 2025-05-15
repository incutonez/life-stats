import { Controller, Get } from "@nestjs/common";
import { AppService } from "src/app/app.service";
import { AppInfoViewModel } from "src/viewModels/app.info.viewmodel";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	@Get("info")
	getInfo(): AppInfoViewModel {
		return this.appService.getInfo();
	}
}
