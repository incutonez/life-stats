import { Model } from "sequelize-typescript";

export class BaseModel extends Model {
	getPlain() {
		return this.get(({
			plain: true,
		}));
	}
}
