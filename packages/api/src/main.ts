import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import compression from "compression";
import { json } from "express";
import { writeFileSync } from "fs";
import * as path from "path";
import { AppModule } from "src/app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.use(compression());
	app.use(json({
		limit: "50mb",
	}));
	const config = new DocumentBuilder().setTitle("API").setDescription("The main API for the UI").setVersion("1.0").build();
	const document = SwaggerModule.createDocument(app, config, {
		operationIdFactory: (_: string, methodKey: string) => methodKey,
	});
	SwaggerModule.setup("api", app, document);
	const outputPath = path.resolve(process.cwd(), "../spec/swagger.json");
	// Taken from https://stackoverflow.com/a/64935977/1253609
	writeFileSync(outputPath, JSON.stringify(document), {
		encoding: "utf8",
	});
	await app.listen(3000);
}
bootstrap();
