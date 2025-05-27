import { env } from "node:process";
import { auth } from "express-oauth2-jwt-bearer";

const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = env;

export const checkJWT = auth({
	audience: AUTH0_AUDIENCE,
	issuerBaseURL: AUTH0_DOMAIN,
});
