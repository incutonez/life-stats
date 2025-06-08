export interface IStravaAuthResponse {
	"token_type": string;
	"expires_at": number;
	"expires_in": number;
	"refresh_token": string;
	"access_token": string;
	"athlete": IStravaAthlete;
}

export interface IStravaAthlete {
	"id": number;
	"username": string;
	"resource_state": number;
	"firstname": string;
	"lastname": string;
	"bio": string;
	"city": string;
	"state": string;
	"country": string;
	"sex": string;
	"premium": boolean;
	"summit": boolean;
	"created_at": string;
	"updated_at": string;
	"badge_type_id": number;
	"weight": number;
	"profile_medium": string;
	"profile": string;
	"friend"?: unknown;
	"follower"?: unknown;
}

export interface IStravaActivity {
	"resource_state": number;
	"athlete": {
		"id": number;
		"resource_state": number;
	};
	"name": string;
	"distance": number;
	"moving_time": number;
	"elapsed_time": number;
	"total_elevation_gain": number;
	"type": string;
	"sport_type": string;
	"workout_type"?: unknown;
	"id": number;
	"external_id": string;
	"upload_id": number;
	"start_date": string;
	"start_date_local": string;
	"timezone": string;
	"utc_offset": number;
	"start_latlng"?: unknown;
	"end_latlng"?: unknown;
	"location_city"?: unknown;
	"location_state"?: unknown;
	"location_country": string;
	"achievement_count": number;
	"kudos_count": number;
	"comment_count": number;
	"athlete_count": number;
	"photo_count": number;
	"map": {
		"id": string;
		"summary_polyline"?: unknown;
		"resource_state": number;
	};
	"trainer": boolean;
	"commute": boolean;
	"manual": boolean;
	"private": boolean;
	"flagged": boolean;
	"gear_id": string;
	"from_accepted_tag": boolean;
	"average_speed": number;
	"max_speed": number;
	"average_cadence": number;
	"average_watts": number;
	"weighted_average_watts": number;
	"kilojoules": number;
	"device_watts": boolean;
	"has_heartrate": boolean;
	"average_heartrate": number;
	"max_heartrate": number;
	"max_watts": number;
	"pr_count": number;
	"total_photo_count": number;
	"has_kudoed": boolean;
	"suffer_score": number;
}
