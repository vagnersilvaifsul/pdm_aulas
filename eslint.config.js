//https://docs.expo.dev/guides/using-eslint/ e https://eslint.org/blog/2022/08/new-config-system-part-2/
const { defineConfig, globalIgnores } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
	globalIgnores(["dist/*"]),
	expoConfig,
	{
		rules: {
			"no-console": ["error", { allow: ["warn", "error"] }],
		},
	},
]);
