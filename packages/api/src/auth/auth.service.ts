import { env } from "node:process";
import { Injectable } from "@nestjs/common";
import axios from "axios";
import { IStravaActivity, IStravaAuthResponse } from "@/auth/types";
import { StravaTokenViewModel } from "@/viewModels/exercises/strava.token.viewmodel";

@Injectable()
export class AuthService {
	async getStravaToken({ expirationDate = 0, refreshToken = "", accessToken }: StravaTokenViewModel): Promise<StravaTokenViewModel | undefined> {
		if (expirationDate >= Date.now()) {
			return {
				expirationDate,
				refreshToken,
				accessToken,
			};
		}
		const refresh = expirationDate !== 0;
		const params: Record<string, string> = {
			client_id: env.VITE_STRAVA_CLIENT_ID!,
			client_secret: env.VITE_STRAVA_CLIENT_SECRET!,
			grant_type: refresh ? "refresh_token" : "authorization_code",
		};
		if (refresh) {
			params.refresh_token = refreshToken;
		}
		else {
			params.code = accessToken;
		}
		try {
			const { data } = await axios<IStravaAuthResponse>({
				params,
				url: "https://www.strava.com/oauth/token",
				method: "POST",
			});
			return {
				accessToken: data.access_token,
				refreshToken: data.refresh_token,
				expirationDate: data.expires_at,
			};
		}
		catch (ex) {
			console.error("ERROR", ex);
		}
	}

	async syncStravaActivities(stravaToken: StravaTokenViewModel): Promise<StravaTokenViewModel | undefined> {
		const response = await this.getStravaToken(stravaToken);
		if (response) {
			const { data } = await axios<IStravaActivity[]>({
				url: "https://www.strava.com/api/v3/athlete/activities",
				method: "GET",
				headers: {
					Authorization: `Bearer ${response.accessToken}`,
				},
				params: {
					per_page: 200,
				},
			});
			console.info(data);
			// TODOJEF: Check to see if response has exceeded 200... if so, query for next 200 from next page
			return stravaToken;
		}
	}
}
