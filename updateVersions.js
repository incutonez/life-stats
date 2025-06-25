import { execSync } from "child_process";
import {existsSync, readdirSync, writeFileSync} from "fs";
import {readFileSync} from "node:fs";

const stdio = [0, 1, 2];
const nextReleaseVersion = process.env.NEXT_RELEASE_VERSION;
if (nextReleaseVersion) {
	if (existsSync("packages/")) {
		readdirSync("packages/").forEach((packageName) => {
			const path = `packages/${packageName}/package.json`;
			const packageJSON = JSON.parse(readFileSync(path, "utf8"));
			packageJSON.version = nextReleaseVersion;
			writeFileSync(path, JSON.stringify(packageJSON, null, 2));
		}, {
			stdio,
		});
		execSync("git add .");
	}
}
execSync("npx semantic-release --deps.bump=inherit", {
	stdio: [0, 1, 2],
});
