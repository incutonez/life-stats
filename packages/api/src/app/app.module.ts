import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "@/app/app.controller";
import { AppService } from "@/app/app.service";
import { AttributeTypesModule } from "@/attributeTypes/attributeTypes.module";
import { AuditsModule } from "@/audits/audits.module";
import { AuthModule } from "@/auth/auth.module";
import { DatabaseModule } from "@/db/database.module";
import { ExercisesModule } from "@/exercises/exercises.module";
import { JobsModule } from "@/jobs/jobs.module";
import { UsersModule } from "@/users/users.module";

/**
 * We handle the env configuration in db/config.ts.  It's a little confusing, but that's the very first file that's
 * imported, and it needs access to the env vars before Nest has a chance to set them up, so we manually call dotenv
 */
@Module({
	imports: [
		AuthModule,
		DatabaseModule,
		AuditsModule,
		JobsModule,
		ExercisesModule,
		UsersModule,
		AttributeTypesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(_consumer: MiddlewareConsumer) {
	}
}
