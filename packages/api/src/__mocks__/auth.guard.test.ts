import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { DefaultContext } from "./storage";

@Injectable()
export class AuthGuardTest implements CanActivate {
	constructor(@Inject(SESSION_STORAGE) private storage: SessionStorageService) {
	}

	async canActivate(context: ExecutionContext) {
		const http = context.switchToHttp();
		const req = http.getRequest();
		this.storage.setMeasurementSystem(req.headers["accept-language"] ?? "en-US");
		this.storage.setUser(req.headers["authorization"] ?? DefaultContext.user);
		this.storage.setUserSettings(DefaultContext.userSettings);
		return true;
	}
}
