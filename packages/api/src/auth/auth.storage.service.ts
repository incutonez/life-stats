import { Injectable } from "@nestjs/common";
import { JWTPayload } from "express-oauth2-jwt-bearer";
import { ClsService } from "nestjs-cls";
import { IAuthStorage } from "@/types";

@Injectable()
export class AuthStorageService {
	constructor(private readonly cls: ClsService<IAuthStorage>) {}

	setUser(payload: JWTPayload) {
		this.cls.set("user", payload);
	}

	getUserId() {
		return this.cls.get("user").sub!;
	}
}
