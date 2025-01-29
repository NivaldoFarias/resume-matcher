import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslintPluginPrettier,
	eslint.configs.recommended,
	tseslint.configs.recommendedTypeChecked,
	new FlatCompat({ baseDirectory: import.meta.dirname }).config({
		extends: ["next/core-web-vitals", "next/typescript"],
		rules: {
			"react/no-unescaped-entities": "off",
		},
	}),
	{
		files: ["**/*.{js,ts,jsx,tsx}"],
		plugins: {
			"@typescript-eslint": tseslint.plugin,
		},
		languageOptions: {
			globals: globals.node,
			parser: tseslint.parser,
			parserOptions: {
				project: ["./tsconfig.json"],
			},
		},
		rules: {
			"no-var": "off",
			"no-unused-vars": "off",

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
	{
		files: ["**/*.{jsx,tsx}"],
		languageOptions: {
			globals: globals.browser,
		},
	},
);
