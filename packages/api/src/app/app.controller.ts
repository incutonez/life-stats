import { Controller, Get } from "@nestjs/common";
import { AppService } from "@/app/app.service";
import { Public } from "@/constants";
import { AppMetaViewModel } from "@/viewModels/app.meta.viewmodel";

@Controller()
export class AppController {
	constructor(private readonly service: AppService) {
	}

	@Public()
	@Get("info")
	getInfo(): AppMetaViewModel {
		return this.service.getInfo();
	}
}
