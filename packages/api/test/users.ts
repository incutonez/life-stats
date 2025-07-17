import { IUserModel, IUserSettingsModel } from "@/db/models/UserModel";

export const TestUsers: IUserModel[] = [{
	id: "6f240def-2993-4cfe-bb19-4834cf78331f",
	first_name: "Test",
	last_name: "User",
	email: "test@example.com",
	nickname: "Tester",
	user_id: "1234567890",
	last_accessed: new Date("2025-07-17 14:50:00.477 +00:00"),
	get settings(): IUserSettingsModel {
		return {
			exercises: {},
		};
	},
}];
