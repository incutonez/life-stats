import { Global, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthController } from "@/auth/auth.controller";
import { AuthGuard } from "@/auth/auth.guard";
import { AuthService } from "@/auth/auth.service";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";

/**
 * Idea taken from https://medium.com/elementor-engineers/stop-passing-request-data-around-your-nestjs-application-9893ac073821
 */
@Global()
@Module({
	providers: [{
		provide: APP_GUARD,
		useClass: AuthGuard,
	}, {
		provide: SESSION_STORAGE,
		useClass: SessionStorageService,
	}, AuthService],
	exports: [SESSION_STORAGE],
	controllers: [AuthController],
})
export class AuthModule {}
