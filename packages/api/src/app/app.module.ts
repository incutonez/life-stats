import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ClsModule } from "nestjs-cls";
import { AppController } from "@/app/app.controller";
import { AppService } from "@/app/app.service";
import { AuditsModule } from "@/audits/audits.module";
import { AuthStorageModule } from "@/auth/auth.storage.module";
import { DatabaseModule } from "@/db/database.module";
import { ExercisesModule } from "@/exercises/exercises.module";
import { JobsModule } from "@/jobs/jobs.module";

/**
 * We handle the env configuration in db/config.ts.  It's a little confusing, but that's the very first file that's
 * imported, and it needs access to the env vars before Nest has a chance to set them up, so we manually call dotenv
 */
@Module({
	imports: [
		AuthStorageModule,
		DatabaseModule,
		AuditsModule,
		JobsModule,
		ExercisesModule,
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
			},
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(_consumer: MiddlewareConsumer) {
	}
}
