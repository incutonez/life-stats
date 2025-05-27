import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppController } from "src/app/app.controller";
import { AppService } from "src/app/app.service";
import { getDBConfig } from "src/db/config";
import { ApplicationsModule } from "@/applications/applications.module";
import { AuthStorageMiddleware } from "@/auth/auth.storage.middleware";
import { AuthStorageModule } from "@/auth/auth.storage.module";
import { CompaniesModule } from "@/companies/companies.module";

@Module({
	imports: [
		AuthStorageModule,
		ApplicationsModule,
		CompaniesModule,
		ConfigModule.forRoot({
			envFilePath: [".env.local", ".env"],
		}),
		SequelizeModule.forRoot(getDBConfig()),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthStorageMiddleware).forRoutes("*");
	}
}
