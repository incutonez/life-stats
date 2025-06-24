import { execSync } from "child_process";
import { readdirSync } from "fs";

const stdio = [0, 1, 2];
readdirSync("packages/").forEach((packageName) => {
	execSync("npx semantic-release --deps.bump=inherit", {
		stdio,
		cwd: `packages/${packageName}`,
	});
}, {
	stdio,
});
