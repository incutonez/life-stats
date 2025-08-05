import { DataTypes } from "@sequelize/core";
import { Attribute } from "@sequelize/core/decorators-legacy";
import { EnumTableNames } from "@/constants";
import { BaseTable, PrimaryKeyGuid } from "@/db/decorators";
import { BaseModel } from "@/db/models/BaseModel";
import { ModelInterface } from "@/types";

export type IUserModel = ModelInterface<UserModel>;
export type IUserCreateModel = Omit<IUserModel, "id" | "settings"> & {
	settings: IUserSettingsModel;
};
export interface IUserSettingsExercisesModel {
	weight?: number;
}

export interface IUserSettingsModel {
	exercises: IUserSettingsExercisesModel;
}

@BaseTable(EnumTableNames.users)
export class UserModel extends BaseModel {
	@PrimaryKeyGuid()
	id: string;

	@Attribute(DataTypes.STRING)
	first_name: string;

	@Attribute(DataTypes.STRING)
	last_name?: string;

	@Attribute(DataTypes.STRING)
	email: string;

	@Attribute(DataTypes.STRING)
	nickname?: string;

	@Attribute(DataTypes.DATE)
	last_accessed: Date;

	@Attribute(DataTypes.JSON)
	get settings(): IUserSettingsModel {
		return JSON.parse(this.getDataValue("settings"));
	}

	set settings(value: IUserSettingsModel) {
		this.setDataValue("settings", JSON.stringify(value));
	}
}
