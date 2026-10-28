/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	printWidth: 80,
	semi: true,
	bracketSameLine: true,
	trailingComma: "all",
	overrides: [
		{
			files: ["*.md", "*.mdx", "*.toml", "*.yml", "*.yaml"],
			options: {
				useTabs: false,
			},
		},
		{
			files: ["*.md", "*.mdx"],
			options: {
				proseWrap: "always",
			},
		},
	],
};
