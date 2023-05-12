module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:jest/recommended",
  ],
  plugins: [],
  env: {
    browser: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        paths: [".ts", ".tsx"],
      },
    },
  },
  root: true,
  rules: {
    quotes: ["error", "double"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["error", { extensions: [".ts", ".tsx"] }],
    "import/extensions": [
      "error",
      {
        ts: "never",
        tsx: "never",
      },
    ],
  },
};
