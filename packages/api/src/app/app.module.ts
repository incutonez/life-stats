import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "src/app/app.controller";
import { AppService } from "src/app/app.service";
import { ApplicationsModule } from "@/applications/applications.module";
import { AuthStorageMiddleware } from "@/auth/auth.storage.middleware";
import { AuthStorageModule } from "@/auth/auth.storage.module";
import { CompaniesModule } from "@/companies/companies.module";
import { DatabaseModule } from "@/db/database.module";

@Module({
	imports: [
		AuthStorageModule,
		ApplicationsModule,
		CompaniesModule,
		DatabaseModule,
		ConfigModule.forRoot({
			envFilePath: [".env.local", ".env"],
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthStorageMiddleware).forRoutes("*");
	}
}
