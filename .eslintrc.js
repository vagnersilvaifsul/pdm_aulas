// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: "expo",
	ignorePatterns: ["/dist/*"],
	rules: {
		"no-console": ["error", { allow: ["warn", "error"] }],
	},
};
