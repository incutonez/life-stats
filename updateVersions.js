import { execSync } from "child_process";
import {existsSync, readdirSync} from "fs";
import {readFileSync} from "node:fs";

const stdio = [0, 1, 2];
const nextReleaseVersion = process.env.NEXT_RELEASE_VERSION;
if (nextReleaseVersion) {
	if (existsSync("packages/")) {
		readdirSync("packages/").forEach((packageName) => {
			const packageJSON = JSON.parse(readFileSync(`packages/${packageName}/package.json`, "utf8"));
			packageJSON.version = nextReleaseVersion;
		}, {
			stdio,
		});
	}
}
execSync("npx semantic-release --deps.bump=inherit", {
	stdio: [0, 1, 2],
});
