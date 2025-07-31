import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean } from "class-validator";

export interface IUploadApplicationModel {
	company: string;
	positionTitle: string;
	dateApplied: string;
	url: string;
	compensation: string;
	comments: string;
	status: string;
}

export class ApplicationsUploadViewModel {
	@ApiProperty({
		type: "string",
		format: "boolean",
	})
	@IsBoolean()
	@Transform(({ value }) => value === "true")
	addHeaders = true;

	@ApiProperty({
		type: "string",
		format: "binary",
		required: true,
	})
	file: Express.Multer.File;
}
