import { DataTypes, NonAttribute } from "@sequelize/core";
import { Attribute, BelongsTo, HasMany, NotNull } from "@sequelize/core/decorators-legacy";
import { EnumTableNames, PoundToCalories } from "@/constants";
import { AttributeEnum, BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { calculateCalories, EnumActivitySource } from "@/exercises/constants";
import { ActivityActionModel } from "@/exercises/models/ActivityActionModel";
import {
	ActivityAttributeModel,
} from "@/exercises/models/ActivityAttributeModel";
import { ActivityTypeModel } from "@/exercises/models/ActivityTypeModel";
import { ModelInterface } from "@/types";

export type IActivityModel = ModelInterface<ActivityModel>;

export type IActivityUpdateModel = Omit<IActivityModel, "id" | "attributes" | "activity_type" | "calories" | "weight_lost" | "actions">;

@BaseTable(EnumTableNames.exerciseActivities)
export class ActivityModel extends BaseModel {
	@PrimaryKeyGuid()
	id: string;

	@Attribute(DataTypes.STRING)
	title: string;

	@Attribute(DataTypes.STRING)
	@NotNull
	activity_type_id: string;

	@Attribute(DataTypes.INTEGER)
	date_occurred: number;

	@BelongsTo(() => ActivityTypeModel, {
		foreignKey: "activity_type_id",
	})
	activity_type?: NonAttribute<ActivityTypeModel>;

	@Attribute(DataTypes.DOUBLE)
	weight?: number;

	@Attribute(DataTypes.DOUBLE)
	duration?: number;

	@Attribute(DataTypes.STRING)
	description?: string;

	@AttributeEnum(EnumActivitySource)
	source?: EnumActivitySource;

	@Attribute(DataTypes.STRING)
	source_id?: string;

	@HasMany(() => ActivityAttributeModel, {
		foreignKey: "activity_id",
		inverse: "activity",
	})
	attributes?: NonAttribute<ActivityAttributeModel[]>;

	@HasMany(() => ActivityActionModel, {
		foreignKey: "activity_id",
		inverse: "activity",
	})
	actions?: NonAttribute<ActivityActionModel[]>;

	@Attribute(DataTypes.VIRTUAL(DataTypes.DOUBLE, ["duration", "activity_type_id", "weight"]))
	get calories(): NonAttribute<number | undefined> {
		const duration = this.get("duration");
		const activityType = this.get("activity_type");
		if (duration && activityType) {
			return calculateCalories(activityType.name, duration, this.get("weight"));
		}
	}

	@Attribute(DataTypes.VIRTUAL(DataTypes.DOUBLE, ["calories"]))
	get weight_lost(): NonAttribute<number | undefined> {
		const calories = this.get("calories");
		if (calories) {
			return calories / PoundToCalories;
		}
	}
}
