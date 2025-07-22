import { forwardRef, Global, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ClsModule } from "nestjs-cls";
import { AuthGuard } from "@/auth/auth.guard";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { UsersModule } from "@/users/users.module";

/**
 * Idea taken from https://medium.com/elementor-engineers/stop-passing-request-data-around-your-nestjs-application-9893ac073821
 */
@Global()
@Module({
	imports: [
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
			},
		}), forwardRef(() => UsersModule)],
	providers: [{
		provide: APP_GUARD,
		useExisting: AuthGuard,
	}, AuthGuard, {
		provide: SESSION_STORAGE,
		useExisting: SessionStorageService,
	}, SessionStorageService],
	exports: [SESSION_STORAGE],
})
export class AuthModule {}
