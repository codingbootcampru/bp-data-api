module.exports = {
	extends: "airbnb-base",
	env: {
		browser: true,
		node: true,
		jest: true
	},
	parser: "babel-eslint",
	parserOptions: {
		ecmaVersion: 7,
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: [
		"react"
	],
	rules: {
		"comma-dangle": ["error", "never"],
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
	    "import/prefer-default-export": [0],
	    "func-names": [0]
	},
	settings: {
		"import/resolver": {
			node: {
				extensions: [
					".js",
					".jsx"
				]
			}
		}
	}
};
