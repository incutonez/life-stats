import { Transform } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";
import { UploadViewModelsResponse } from "@/types";

export class StravaTokenViewModel extends UploadViewModelsResponse {
	@IsString()
	accessToken: string;

	@Transform(({ value = "" }) => value)
	@IsString()
	@IsOptional()
	refreshToken?: string;

	@Transform(({ value = 0 }) => value)
	@IsInt()
	@IsOptional()
	expirationDate?: number;
}
