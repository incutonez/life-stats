import { Injectable } from "@nestjs/common";
import { ClsService } from "nestjs-cls";
import { IAuthUser, ISessionStorage } from "@/types";
import { UserSettingsViewModel } from "@/viewModels/user.viewmodel";

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

	setUserSettings(userSettings: UserSettingsViewModel) {
		this.cls.set("userSettings", userSettings);
	}

	getUserSettings() {
		return this.cls.get("userSettings");
	}
}
