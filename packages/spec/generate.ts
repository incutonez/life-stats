import { execSync } from "node:child_process";

const options = {
	stdio: [0, 1, 2],
};

execSync("npx rimraf generated dist", options);
execSync(`docker run --rm -v ${process.cwd()}:/local openapitools/openapi-generator-cli generate -g typescript-axios -i /local/swagger.json -o /local/generated/ -p withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models,supportsES6=true,withInterfaces=true`, options);
execSync("npm run build", options);