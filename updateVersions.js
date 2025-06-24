import { execSync } from "child_process";

// Updates packages/*
execSync("npx semantic-release --dry-run --no-ci", {
	stdio: [0, 1, 2],
});
execSync("npx semantic-release --deps.bump=inherit", {
	stdio: [0, 1, 2],
});
