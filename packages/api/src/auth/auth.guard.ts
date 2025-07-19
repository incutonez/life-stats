﻿import { env } from "node:process";
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { auth } from "express-oauth2-jwt-bearer";
import { SessionStorageService } from "@/auth/session.storage.service";
import { IS_PUBLIC_KEY, SESSION_STORAGE } from "@/constants";
import { UsersService } from "@/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(@Inject(SESSION_STORAGE) private storage: SessionStorageService, private readonly usersService: UsersService, private reflector: Reflector) {
	}

	async canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		const http = context.switchToHttp();
		const req = http.getRequest();
		this.storage.setMeasurementSystem(req.headers["accept-language"]);
		if (isPublic) {
			return true;
		}
		const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = env;
		const checkJWT = auth({
			audience: AUTH0_AUDIENCE,
			issuerBaseURL: AUTH0_DOMAIN,
		});
		await checkJWT(req, http.getResponse(), (err: unknown) => {
			if (err) {
				throw err;
			}
		});
		const userSettings = await this.usersService.getUserSettings(req.auth.payload.sub!);
		this.storage.setUser(req.auth.payload);
		this.storage.setUserSettings(userSettings!);
		return true;
	}
}
