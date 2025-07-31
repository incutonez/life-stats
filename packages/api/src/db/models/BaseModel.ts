import { CreationOptional, DataTypes, Model } from "@sequelize/core";
import { Attribute, NotNull } from "@sequelize/core/decorators-legacy";

export class BaseModel extends Model {
	@Attribute(DataTypes.STRING)
	@NotNull
	user_id: string;

	@Attribute(DataTypes.DATE)
	created_at?: CreationOptional<Date>;

	@Attribute(DataTypes.DATE)
	updated_at?: CreationOptional<Date>;

	getPlain() {
		return this.get(({
			plain: true,
		}));
	}
}
