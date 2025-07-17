import { resolve } from "node:path";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		passWithNoTests: true,
		clearMocks: true,
		root: "./",
		include: ["**/*.spec.ts"],
		reporters: ["verbose"],
		testTimeout: 120000,
		coverage: {
			enabled: false,
			all: false,
			provider: "v8",
			include: ["src/**"],
			reporter: ["json-summary", "html"],
		},
	},
	plugins: [
		// This is required to build the test files with SWC
		swc.vite({
			// Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
			module: {
				type: "es6",
			},
			jsc: {
				transform: {
					useDefineForClassFields: false,
				},
			},
		}),
	],
	resolve: {
		alias: {
			// Ensure Vitest correctly resolves TypeScript path aliases
			"@": resolve(__dirname, "./src"),
		},
	},
});
