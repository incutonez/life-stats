import { env } from "node:process";
import { Inject, Injectable } from "@nestjs/common";
import axios from "axios";
import Papa from "papaparse";
import { SessionStorageService } from "@/auth/session.storage.service";
import { SESSION_STORAGE } from "@/constants";
import { ActivitiesService } from "@/exercises/activities/activities.service";
import { StravaMapper } from "@/exercises/activities/strava.mapper";
import { ACTIVITIES_REPOSITORY, EnumActivitySource } from "@/exercises/constants";
import { ActivitiesRepository } from "@/exercises/models";
import { IStravaActivity, IStravaAuthResponse, IStravaImport } from "@/exercises/types";
import {
	ActivityViewModel,
	IActivityCreateViewModel,
	IActivityViewModel,
} from "@/exercises/viewModels/activity.viewmodel";
import { StravaTokenViewModel } from "@/exercises/viewModels/strava.token.viewmodel";
import { IUploadViewModelsResponse } from "@/types";
import { getErrorMessage } from "@/utils";

const PerPage = 200;

@Injectable()
export class StravaService {
	constructor(@Inject(ACTIVITIES_REPOSITORY) private readonly repository: ActivitiesRepository, private readonly activitiesService: ActivitiesService, private readonly mapper: StravaMapper, @Inject(SESSION_STORAGE) private readonly storage: SessionStorageService) {
	}

	async getUserAccessToken({ expirationDate = 0, refreshToken = "", accessToken, successful = 0, errors = [] }: StravaTokenViewModel): Promise<StravaTokenViewModel | undefined> {
		if (expirationDate >= Date.now()) {
			return {
				expirationDate,
				refreshToken,
				accessToken,
				successful,
				errors,
			};
		}
		const refresh = expirationDate !== 0;
		const params: Record<string, string> = {
			client_id: env.STRAVA_CLIENT_ID!,
			client_secret: env.STRAVA_CLIENT_SECRET!,
			grant_type: refresh ? "refresh_token" : "authorization_code",
		};
		if (refresh) {
			params.refresh_token = refreshToken;
		}
		else {
			params.code = accessToken;
		}
		const response = await axios.request<IStravaAuthResponse>({
			params,
			url: "https://www.strava.com/oauth/token",
			method: "POST",
		});
		const { data } = response;
		return {
			successful,
			errors,
			accessToken: data.access_token,
			refreshToken: data.refresh_token,
			expirationDate: data.expires_at,
		};
	}

	importActivities(file: Express.Multer.File, source: EnumActivitySource, addHeaders = false) {
		let contents = file.buffer.toString("utf8");
		const results: IActivityCreateViewModel[] = [];
		if (source === EnumActivitySource.Strava) {
			if (addHeaders) {
				contents = `Activity ID,Activity Date,Activity Name,Activity Type,Activity Description,Elapsed Time,Distance,Max Heart Rate,Relative Effort,Commute,Activity Private Note,Activity Gear,Filename,Athlete Weight,Bike Weight,Elapsed Time,Moving Time,Distance,Max Speed,Average Speed,Elevation Gain,Elevation Loss,Elevation Low,Elevation High,Max Grade,Average Grade,Average Positive Grade,Average Negative Grade,Max Cadence,Average Cadence,Max Heart Rate,Average Heart Rate,Max Watts,Average Watts,Calories,Max Temperature,Average Temperature,Relative Effort,Total Work,Number of Runs,Uphill Time,Downhill Time,Other Time,Perceived Exertion,Type,Start Time,Weighted Average Power,Power Count,Prefer Perceived Exertion,Perceived Relative Effort,Commute,Total Weight Lifted,From Upload,Grade Adjusted Distance,Weather Observation Time,Weather Condition,Weather Temperature,Apparent Temperature,Dewpoint,Humidity,Weather Pressure,Wind Speed,Wind Gust,Wind Bearing,Precipitation Intensity,Sunrise Time,Sunset Time,Moon Phase,Bike,Gear,Precipitation Probability,Precipitation Type,Cloud Cover,Weather Visibility,UV Index,Weather Ozone,Jump Count,Total Grit,Average Flow,Flagged,Average Elapsed Speed,Dirt Distance,Newly Explored Distance,Newly Explored Dirt Distance,Activity Count,Total Steps,Carbon Saved,Pool Length,Training Load,Intensity,Average Grade Adjusted Pace,Timer Time,Total Cycles,Media\n${contents}`;
			}
			const { data } = Papa.parse<IStravaImport>(contents, {
				header: true,
				skipEmptyLines: true,
			});
			for (const item of data) {
				results.push(this.mapper.importToViewModel(item));
			}
		}
		return results;
	}

	async uploadActivities(viewModels: ActivityViewModel[]) {
		const results: IUploadViewModelsResponse = {
			successful: 0,
			errors: [],
		};
		for (const viewModel of viewModels) {
			try {
				await this.activitiesService.createActivity(viewModel);
				results.successful++;
			}
			catch (error: unknown) {
				results.errors.push(getErrorMessage(error));
			}
		}
		return results;
	}

	async getStravaActivities(accessToken: string, page = 1, after?: number) {
		const { data } = await axios.request<IStravaActivity[]>({
			// https://developers.strava.com/docs/reference/#api-Activities-getLoggedInAthleteActivities
			url: "https://www.strava.com/api/v3/athlete/activities",
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			params: {
				page,
				after,
				per_page: PerPage,
			},
		});
		return data;
	}

	async syncActivities(stravaToken: StravaTokenViewModel): Promise<StravaTokenViewModel | undefined> {
		// Let's find the user's latest strava activity, so we have a starting point for filtering out records from Strava
		const lastActivity = await this.repository.findOne({
			where: {
				source: EnumActivitySource.Strava,
				user_id: this.storage.getUserId(),
			},
			order: [["date_occurred", "DESC"]],
		});
		const response = await this.getUserAccessToken(stravaToken);
		if (response) {
			let page = 1;
			const allRecords: IActivityViewModel[] = [];
			let hasMoreRecord = true;
			/**
			 * The API just says "epoch timestamp" but this must be in seconds...
			 * Source: https://groups.google.com/g/strava-api/c/uh0gZAa0dJw
			 */
			const afterTimestamp = lastActivity && lastActivity.date_occurred / 1000 || undefined;
			while (hasMoreRecord) {
				const data = await this.getStravaActivities(response.accessToken, page++, afterTimestamp);
				allRecords.push(...data.map((item) => this.mapper.apiToViewModel(item)));
				// If we're less than the page limit, then we know we've hit the end of the records, so we'll break
				hasMoreRecord = data.length >= PerPage;
			}
			for (const record of allRecords) {
				try {
					await this.activitiesService.createActivity(record);
					response.successful++;
				}
				catch (ex) {
					response.errors.push((ex as Error).toString());
				}
			}
		}
		return response;
	}
}
