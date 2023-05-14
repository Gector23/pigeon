module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        paths: [".ts"],
      },
    },
  },
  root: true,
  rules: {
    quotes: ["error", "double"],
    "import/extensions": [
      "error",
      {
        ts: "never",
      },
    ],
    "implicit-arrow-linebreak": "off",
  },
};
