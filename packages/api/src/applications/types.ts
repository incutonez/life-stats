import { ApiProperty } from "@nestjs/swagger";

export interface IUploadModel {
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
		addHeaders = true;

    @ApiProperty({
    	type: "string",
    	format: "binary",
    	required: true,
    })
    declare file: Express.Multer.File;
}
