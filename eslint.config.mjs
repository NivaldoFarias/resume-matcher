import eslint from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslintPluginPrettier,
	{
		files: ["**/*.{js,ts,jsx,tsx}"],
		plugins: {
			"@typescript-eslint": tseslint.plugin,
			"@next/next": nextPlugin,
		},
		languageOptions: {
			globals: {
				...globals.node,
				Bun: "readonly",
			},
			parser: tseslint.parser,
			parserOptions: {
				project: ["./tsconfig.json"],
			},
		},
		rules: {
			...nextPlugin.configs["core-web-vitals"].rules,
			...nextPlugin.configs.recommended.rules,
			...eslint.configs.recommended.rules,
			"no-unused-vars": "off",

			// typescript-eslint rules
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			"@typescript-eslint/dot-notation": "off",
		},
	},
	{
		files: ["*.cjs"],
		languageOptions: {
			globals: globals.commonjs,
		},
	},
	{
		files: ["*.mjs"],
		languageOptions: {
			globals: globals.node,
		},
	},
);
