import { faker } from "@faker-js/faker";
import axios from "axios";
import { vi } from "vitest";
import { stravaActivities } from "@/__mocks__/exercises";

vi.mock("axios");
export const mockedAxios = vi.mocked(axios, true);
export const accessToken = faker.internet.jwt();
export const refreshToken = faker.internet.jwt();
export const expiresAt = faker.date.future().getTime();

mockedAxios.request.mockImplementation(({ url }) => {
	if (url === "https://www.strava.com/oauth/token") {
		return Promise.resolve({
			data: {
				access_token: accessToken,
				refresh_token: refreshToken,
				expires_at: expiresAt,
			},
		});
	}
	else if (url === "https://www.strava.com/api/v3/athlete/activities") {
		return Promise.resolve({
			data: stravaActivities,
		});
	}
	return Promise.resolve({
		data: [],
	});
});
