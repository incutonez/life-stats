import { ApiProperty } from "@nestjs/swagger";

export class BaseViewModel {
	@ApiProperty({
		required: false,
	})
	declare userId?: string;

	@ApiProperty({
		required: false,
	})
	declare dateCreated?: number;

	@ApiProperty({
		required: false,
	})
	declare dateUpdated?: number;
}
