import { ISessionStorage } from "@/types";

export const DefaultContext: ISessionStorage = {
	measurementSystem: "imperial",
	userSettings: {
		exercises: {},
	},
	user: {
		first_name: "Test",
		last_name: "User",
		email: "test@example.com",
		nickname: "Tester",
		sub: "1234567890",
	},
};
