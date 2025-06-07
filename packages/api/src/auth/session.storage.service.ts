import { Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { IAuthUser, ISessionStorage } from "@/types";

@Injectable()
export class SessionStorageService {
	constructor(private readonly cls: ClsService<ISessionStorage>) {}

	setMeasurementSystem(language: string) {
		this.cls.set("measurementSystem", language.startsWith("en-US") ? "imperial" : "metric");
	}

	getMeasurementSystem() {
		return this.cls.get("measurementSystem");
	}

	setUser(payload: IAuthUser) {
		this.cls.set("user", payload);
	}

	getUser() {
		return this.cls.get("user");
	}

	getUserId() {
		return this.cls.get("user").sub!;
	}
}
