import { readFileSync, writeFileSync } from "node:fs";

/**
 * The issue we have is that NestJS only allows using x-enumNames in @ApiProperty, but the OpenAPI TypeScript generator
 * ignores x-enumNames and only uses x-enum-varnames, so we're simply translating that here.
 */
const file = readFileSync("./swagger.json", 'utf-8');
writeFileSync("./swagger.json", file.replaceAll("x-enumNames", "x-enum-varnames"));