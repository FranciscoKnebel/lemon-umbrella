module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "env": {
    "browser": true,
    "node": true,
		"jquery": true,
		"commonjs": true,
  },
  "rules": {
    "indent": [2, "tab"],
		"no-tabs": 0,
		"consistent-return": 0,
		"strict": 0,
		"no-console": 0,
		"no-underscore-dangle": 0,
		"import/no-extraneous-dependencies": 0,
		"new-cap": 0,
  }
};
