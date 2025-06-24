import { readFileSync } from "node:fs";
import { env } from "node:process";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import compression from "compression";
import { json } from "express";
import { writeFileSync } from "fs";
import * as path from "path";
import { AppModule } from "@/app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		httpsOptions: env.NODE_ENV === "development" ? undefined : {
			key: readFileSync(path.join(__dirname, env.CERT_KEY_PATH!)),
			cert: readFileSync(path.join(__dirname, env.CERT_CRT_PATH!)),
		},
	});
	if (env.API_PREFIX) {
		app.setGlobalPrefix(env.API_PREFIX);
	}
	app.enableCors();
	app.use(compression());
	app.use(json({
		limit: "50mb",
	}));
	app.enableShutdownHooks();
	if (env.NODE_ENV === "development") {
		const config = new DocumentBuilder().setTitle("API").setDescription("The main API for the UI").setVersion("1.0").build();

		const document = SwaggerModule.createDocument(app, config, {
			operationIdFactory: (_: string, methodKey: string) => methodKey,
		});
		SwaggerModule.setup("api", app, document);
		const outputPath = path.resolve(process.cwd(), "../spec/swagger.json");
		/**
		 * The issue we have is that NestJS only allows using x-enumNames in @ApiProperty, but the OpenAPI TypeScript generator
		 * ignores x-enumNames and only uses x-enum-varnames, so we're simply translating that here.
		 */
		const swaggerContents = JSON.stringify(document).replaceAll("x-enumNames", "x-enum-varnames");
		// Taken from https://stackoverflow.com/a/64935977/1253609
		writeFileSync(outputPath, swaggerContents, {
			encoding: "utf8",
		});
	}
	await app.listen(3000);
}

bootstrap();
