import { Global, Module } from "@nestjs/common";
import { AuthStorageService } from "@/auth/auth.storage.service";
import { AUTH_STORAGE } from "@/constants";

/**
 * Idea taken from https://medium.com/elementor-engineers/stop-passing-request-data-around-your-nestjs-application-9893ac073821
 */
@Global()
@Module({
	providers: [{
		provide: AUTH_STORAGE,
		useClass: AuthStorageService,
	}],
	exports: [AUTH_STORAGE],
})
export class AuthStorageModule {}
