import { Column, Model } from "sequelize-typescript";

export class BaseModel extends Model {
	@Column
	declare created_at?: Date;

	@Column
	declare updated_at?: Date;

	getPlain() {
		return this.get(({
			plain: true,
		}));
	}
}
