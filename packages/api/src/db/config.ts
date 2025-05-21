import crypto from "node:crypto";
import { readFileSync, rmSync } from "node:fs";
import * as process from "node:process";
import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { writeFileSync } from "fs";
import readlineSync from "readline-sync";
import { Readable } from "stream";
import { create, extract } from "tar";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import { ApplicationModel } from "@/db/models/ApplicationModel";
import { CommentModel } from "@/db/models/CommentModel";
import { CompanyModel } from "@/db/models/CompanyModel";

export const DataBaseStoragePath = "src/db/data.db";

export const algorithm = "aes-256-cbc";

export function getPassword() {
	const key = process.env.DATABASE_PASSWORD ?? readlineSync.question("Password: ");
	return crypto.createHash("sha256").update(key).digest("base64").substring(0, 32);
}

export function decrypt(inPath: string) {
	if (!fileExistsSync(inPath)) {
		return;
	}
	const key = getPassword();
	const file = readFileSync(inPath);
	const iv = file.subarray(0, 16);
	const encrypted = file.subarray(16);
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
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
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	// Create the new (encrypted) buffer
	writeFileSync(outPath, Buffer.concat([iv, cipher.update(buffer), cipher.final()]));
	rmSync(file);
}

/* This is a function because if it was just a plain export, process.env.DATABASE_PATH would be undefined, as the env
 * file isn't processed before this global export would happen */
export function getDBConfig(): SequelizeModuleOptions {
	const { DATABASE_PATH, DATABASE_PASSWORD } = process.env;
	if (DATABASE_PASSWORD && DATABASE_PATH && DATABASE_PATH !== DataBaseStoragePath && !fileExistsSync(DataBaseStoragePath)) {
		decrypt(DATABASE_PATH);
	}
	return {
		storage: DataBaseStoragePath,
		dialect: "sqlite",
		host: "localhost",
		models: [ApplicationModel, CommentModel, CompanyModel],
		logging: false,
	};
}
