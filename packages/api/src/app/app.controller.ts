import { Controller, Get } from "@nestjs/common";
import { AppService } from "@/app/app.service";
import { Public } from "@/constants";
import { AppInfoViewModel } from "@/viewModels/app.info.viewmodel";

@Controller()
export class AppController {
	constructor(private readonly service: AppService) {
	}

	@Public()
	@Get("info")
	getInfo(): AppInfoViewModel {
		return this.service.getInfo();
	}
}
