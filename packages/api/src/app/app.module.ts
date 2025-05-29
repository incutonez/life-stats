import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "src/app/app.controller";
import { AppService } from "src/app/app.service";
import { ApplicationsModule } from "@/applications/applications.module";
import { AuditsModule } from "@/audits/audits.module";
import { AuthStorageMiddleware } from "@/auth/auth.storage.middleware";
import { AuthStorageModule } from "@/auth/auth.storage.module";
import { CompaniesModule } from "@/companies/companies.module";
import { DatabaseModule } from "@/db/database.module";

/**
 * We handle the env configuration in db/config.ts.  It's a little confusing, but that's the very first file that's
 * imported, and it needs access to the env vars before Nest has a chance to set them up, so we manually call dotenv
 */
@Module({
	imports: [
		AuthStorageModule,
		ApplicationsModule,
		CompaniesModule,
		DatabaseModule,
		AuditsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthStorageMiddleware).forRoutes("*");
	}
}
