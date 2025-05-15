import pluginIncutonez from "@incutonez/eslint-plugin";
import pluginImport from "eslint-plugin-simple-import-sort";
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	...tseslint.configs.recommended,
	{
		"ignores": [
			"**/dist",
			"**/generated",
			"**/eslint.config.mjs",
		],
	},
	{
		plugins: {
			"typescript-eslint": tseslint.plugin,
		},
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.node,
				...globals.jest,
				...globals.es2021,
			},
			parserOptions: {
				parser: tseslint.parser,
				sourceType: "module",
			},
		},
	},
	{
		plugins: {
			"simple-import-sort": pluginImport,
			"@incutonez": pluginIncutonez,
		},
		rules: {
			"@typescript-eslint/no-unused-vars": ["error", {
				"argsIgnorePattern": "^_",
				"varsIgnorePattern": "^_",
				"caughtErrorsIgnorePattern": "^_"
			}],
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/prefer-namespace-keyword": "off",
			"@/indent": [
				"error",
				"tab",
				{
					SwitchCase: 1,
					ignoredNodes: ["PropertyDefinition"],
				},
			],
			"@typescript-eslint/ban-ts-comment": [
				"error",
				{
					"ts-expect-error": "allow-with-description",
				},
			],
			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
					ignoredNodes: ["PropertyDefinition"],
				},
			],
			"brace-style": ["error", "stroustrup"],
			curly: ["error", "all"],
			"space-before-function-paren": [
				"error",
				{
					anonymous: "never",
					named: "never",
					asyncArrow: "always",
				},
			],
			semi: [2, "always"],
			quotes: ["error", "double"],
			"no-mixed-spaces-and-tabs": "off",
			"comma-dangle": ["error", "always-multiline"],
			"eol-last": ["error", "always"],
			"object-curly-newline": [
				"error",
				{
					ObjectExpression: {
						multiline: true,
						minProperties: 1,
					},
					ObjectPattern: "never",
				},
			],
			"object-curly-spacing": ["error", "always"],
			"object-property-newline": "error",
			"no-trailing-spaces": ["error"],
			"no-var": "error",
			"arrow-spacing": "error",
			"no-duplicate-imports": "error",
			"arrow-parens": "error",
			"computed-property-spacing": ["error", "never"],
			"func-call-spacing": ["error", "never"],
			"new-parens": "error",
			"prefer-const": "error",
			"array-bracket-spacing": ["error", "never"],
			"comma-spacing": ["error", {
				before: false,
				after: true,
			}],
			"array-element-newline": ["error", "consistent"],
			"key-spacing": "error",
			"space-infix-ops": "error",
			"no-multi-spaces": "error",
			"space-before-blocks": "error",
			"keyword-spacing": "error",
			"space-in-parens": "error",
			"simple-import-sort/imports": [
				"error",
				{
					groups: [[
						"^\\u0000",
						"^node:",
						"^vue",
						"^@?\\w",
						"^[^.]",
						"^\\.",
					]],
				},
			],
		},
	});
