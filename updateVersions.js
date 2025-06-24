import { execSync } from "child_process";

const stdio = [0, 1, 2];
execSync("npx semantic-release --dry-run --no-ci", {
	stdio
});
console.log(process.env)
execSync(`echo HERE $NEXT_RELEASE_VERSION`, {
	stdio
});
// execSync("npx semantic-release --deps.bump=inherit", {
// 	stdio: [0, 1, 2],
// });
