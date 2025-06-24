import { execSync } from "child_process";

const versionIndex = process.argv.indexOf("--version");
const version = versionIndex >= 0 ? process.argv[versionIndex + 1] : undefined;
if (version) {
	// Updates packages/*
	console.log("HERE WE ARE", version);
}
else {
	// execSync("npx semantic-release --deps.bump=inherit", {
	// 	stdio: [0, 1, 2],
	// });
}
