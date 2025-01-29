/**
 * @type {import("prettier").Config &
 * 	import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 */
export default {
	semi: true,
	tabWidth: 2,
	useTabs: true,
	printWidth: 100,
	endOfLine: "lf",
	singleQuote: false,
	insertPragma: false,
	trailingComma: "all",
	bracketSpacing: true,
	proseWrap: "preserve",
	jsxSingleQuote: false,
	arrowParens: "always",
	bracketSameLine: false,
	quoteProps: "consistent",
	experimentalTernaries: true,
	embeddedLanguageFormatting: "auto",
	htmlWhitespaceSensitivity: "ignore",
	overrides: [
		{
			files: ["*.d.ts", "*.json"],
			excludeFiles: ["package.json", "package-lock.json"],
			options: {
				tabWidth: 4,
				useTabs: false,
			},
		},
	],
	plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-jsdoc"],
	importOrder: [
		"<BUILTIN_MODULES>",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"<TYPES>",
		"",
		"<TYPES>^[./]",
		"",
		"^@/",
		"",
		"^[.]/",
	],
};
