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
    "import/extensions": ["error", { ts: "never" }],
    "implicit-arrow-linebreak": "off",
    "max-len": "off",
    "object-curly-newline": "off",
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    indent: "off",
    "max-classes-per-file": "off",
    "operator-linebreak": "off",
    "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
  },
};
