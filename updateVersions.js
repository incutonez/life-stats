import { execSync } from "child_process";

execSync("npx semantic-release --deps.bump=inherit", {
	stdio: [0, 1, 2],
});
