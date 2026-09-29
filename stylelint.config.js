/** @type {import("stylelint").Config} */
export default {
	extends: ["stylelint-config-standard-scss"],

	rules: {
		"selector-class-pattern": "^([a-z][a-z0-9]*)((--?|__)?[a-z0-9]+)*$",

		"max-nesting-depth": 3,

		"no-descending-specificity": null,
	},
};
