import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "@/auth/auth.service";
import { UseValidationPipe } from "@/constants";
import { StravaTokenViewModel } from "@/viewModels/exercises/strava.token.viewmodel";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(private readonly service: AuthService) {
	}

	@Post("strava/token")
	@UseValidationPipe()
	async getStravaToken(@Body() body: StravaTokenViewModel) {
		return this.service.getStravaToken(body);
	}

	@Post("strava/sync")
	@UseValidationPipe()
	async syncStravaActivities(@Body() body: StravaTokenViewModel) {
		return this.service.syncStravaActivities(body);
	}
}
