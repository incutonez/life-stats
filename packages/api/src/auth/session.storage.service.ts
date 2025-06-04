import { Injectable } from "@nestjs/common";
import { JWTPayload } from "express-oauth2-jwt-bearer";
import { ClsService } from "nestjs-cls";
import { ISessionStorage } from "@/types";

@Injectable()
export class SessionStorageService {
	constructor(private readonly cls: ClsService<ISessionStorage>) {}

	setMeasurementSystem(language: string) {
		this.cls.set("measurementSystem", language.startsWith("en-US") ? "imperial" : "metric");
	}

	getMeasurementSystem() {
		return this.cls.get("measurementSystem");
	}

	setUser(payload: JWTPayload) {
		this.cls.set("user", payload);
	}

	getUserId() {
		return this.cls.get("user").sub!;
	}
}
