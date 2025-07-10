import crypto from "node:crypto";
import { readFileSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";
import { env } from "node:process";
import { Sequelize } from "@sequelize/core";
import { SqliteDialect } from "@sequelize/sqlite3";
import { configDotenv } from "dotenv";
import { existsSync, writeFileSync } from "fs";
import readlineSync from "readline-sync";
import { Readable } from "stream";
import { create, extract } from "tar";
import { DataBaseStoragePath, EncryptionAlgorithm } from "@/constants";
import { AllModels } from "@/db/models";

/* Ensure that we have our env vars loaded... at this point, the app hasn't bootstrapped, and Nest hasn't had time to
 * load the vars using its config service */
configDotenv({
	path: [".env.prod", ".env.local", ".env"],
});

process.env.NODE_ENV ??= "development";

const { DATABASE_PASSWORD } = env;
const dbPath = getDBPath();
if (DATABASE_PASSWORD && dbPath && dbPath !== DataBaseStoragePath && !existsSync(DataBaseStoragePath)) {
	decrypt(dbPath);
}

export const sequelize = new Sequelize({
	storage: env.NODE_ENV === "test" ? dbPath : DataBaseStoragePath,
	dialect: SqliteDialect,
	logging: false,
	models: AllModels,
	sync: {
		alter: true,
	},
});

export function getDBPath() {
	const { DATABASE_PATH } = env;
	if (DATABASE_PATH) {
		let dbPath = DATABASE_PATH;
		// If we're using a relative path that should expand, let's detect and expand it
		if (dbPath.startsWith("~")) {
			dbPath = dbPath.replace("~", homedir());
		}
		return resolve(dbPath);
	}
	return "src/db/data.db";
}

export function getPassword() {
	const key = env.DATABASE_PASSWORD ?? readlineSync.question("Password: ");
	return crypto.createHash("sha256").update(key).digest("base64").substring(0, 32);
}

export function decrypt(inPath: string) {
	if (!existsSync(inPath)) {
		return;
	}
	const key = getPassword();
	const file = readFileSync(inPath);
	const iv = file.subarray(0, 16);
	const encrypted = file.subarray(16);
	const decipher = crypto.createDecipheriv(EncryptionAlgorithm, key, iv);
	const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
	Readable.from(result).pipe(extract({
		gzip: true,
		sync: true,
	}, [DataBaseStoragePath]));
}

export async function encrypt(outPath: string) {
	const file = "db.tgz";
	create({
		file,
		gzip: true,
		sync: true,
	}, [DataBaseStoragePath]);
	const buffer = readFileSync(file);
	const key = getPassword();
	// Create an initialization vector
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(EncryptionAlgorithm, key, iv);
	// Create the new (encrypted) buffer
	writeFileSync(outPath, Buffer.concat([iv, cipher.update(buffer), cipher.final()]));
	rmSync(file);
}
