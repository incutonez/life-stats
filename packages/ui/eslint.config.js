import eslint from "@eslint/js";
import pluginIncutonez from "@incutonez/eslint-plugin";
import stylisticTs from "@stylistic/eslint-plugin-ts";
import pluginImport from "eslint-plugin-simple-import-sort";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tsEslint from "typescript-eslint";

export default [
	eslint.configs.recommended,
	...tsEslint.configs.recommended,
	...pluginVue.configs["flat/strongly-recommended"], {
		plugins: {
			"typescript-eslint": tsEslint.plugin,
			"@stylistic/ts": stylisticTs,
		},
		languageOptions: {
			ecmaVersion: "latest",
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
				...globals.es2021,
			},
			parserOptions: {
				parser: tsEslint.parser,
				extraFileExtensions: [".vue"],
				sourceType: "module",
			},
		},
	}, {
		plugins: {
			"simple-import-sort": pluginImport,
			"@incutonez": pluginIncutonez,
		},
		rules: {
			"vue/html-indent": ["error", "tab"],
			"vue/attributes-order": "error",
			"quote-props": ["error", "as-needed"],
			"padding-line-between-statements": ["error", {
				blankLine: "always",
				prev: "*",
				next: "export",
			}],
			"space-before-function-paren": ["error", {
				anonymous: "never",
				named: "never",
				asyncArrow: "always",
			}],
			"function-call-argument-newline": ["error", "never"],
			"function-paren-newline": ["error", "never"],
			"no-mixed-spaces-and-tabs": "off",
			"no-var": "error",
			"@typescript-eslint/no-unused-vars": ["error", {
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			}],
			"@stylistic/ts/indent": ["error", "tab", {
				SwitchCase: 1,
				ignoredNodes: ["PropertyDefinition"],
			}],
			"@typescript-eslint/ban-ts-comment": ["error", {
				"ts-expect-error": "allow-with-description",
				"ts-nocheck": "allow-with-description",
			}],
			semi: [2, "always"],
			quotes: ["error", "double"],
			curly: "error",
			"multiline-ternary": ["error", "always-multiline"],
			"brace-style": ["error", "stroustrup"],
			"comma-dangle": ["error", "always-multiline"],
			"eol-last": ["error", "always"],
			"object-curly-newline": ["error", {
				ObjectExpression: {
					multiline: true,
					minProperties: 1,
				},
				ObjectPattern: "never",
			}],
			"object-curly-spacing": ["error", "always"],
			"object-property-newline": "error",
			"no-trailing-spaces": ["error"],
			"no-console": ["error", {
				allow: ["warn", "error", "info"],
			}],
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
			"@incutonez/array-element-newline": ["error", {
				multiline: true,
				minItems: 5,
				bracesSameLine: true,
			}],
			"@incutonez/array-bracket-newline": ["error", {
				multiline: true,
				minItems: 5,
				bracesSameLine: true,
			}],
			"key-spacing": "error",
			"space-infix-ops": "error",
			"no-multi-spaces": "error",
			"space-before-blocks": "error",
			"keyword-spacing": "error",
			"space-in-parens": "error",
			"simple-import-sort/imports": ["error", {
				groups: [[
					"^\\u0000",
					"^vue",
					"^@?\\w",
					"^[^.]",
					"^\\.",
				]],
			}],
		},
	},
];
