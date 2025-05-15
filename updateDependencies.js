import { execSync } from "child_process";
import {existsSync, readdirSync} from "fs";

const stdio = [0, 1, 2];
if (existsSync("packages/")) {
	readdirSync("packages/").forEach((packageName) => {
		console.info(`Updating: ${packageName}`);
		execSync("npx npm-check-updates -u", {
			stdio,
			cwd: `packages/${packageName}`,
		});
	}, {
		stdio,
	});
}
// In any case, we want to update the main package.json, whether it be a workspace or single package
execSync("npx npm-check-updates -u", {
	stdio,
});
