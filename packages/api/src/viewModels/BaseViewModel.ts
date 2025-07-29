import { ApiProperty } from "@nestjs/swagger";

export class BaseViewModel {
	/**
	 * We have opted to use an optional ID for all models because it's possible we're creating models, and if we are,
	 * then there's no ID that's present yet, as the DB assigns the value to ID... so instead of having all these separate
	 * models to recursively make sure IDs aren't set, we just do this.  Probably not the best idea, but it's easier to
	 * maintain as a solo dev.
	 */
	@ApiProperty({
		required: false,
	})
	id?: string;

	@ApiProperty({
		required: false,
	})
	userId?: string;

	@ApiProperty({
		required: false,
	})
	dateCreated?: number;

	@ApiProperty({
		required: false,
	})
	dateUpdated?: number;
}
