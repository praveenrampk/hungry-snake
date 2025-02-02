module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:import/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin", "import", "react-refresh"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-console": [2],
    "@typescript-eslint/no-var-requires": [0],
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        args: "after-used",
      },
    ],
    "@typescript-eslint/no-explicit-any": 0,
    "import/order": [
      2,
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
        groups: [
          "type",
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
    "padding-line-between-statements": [
      2,
      { blankLine: "always", prev: "*", next: "function" },
      { blankLine: "always", prev: "*", next: "multiline-const" },
      { blankLine: "always", prev: "*", next: "multiline-expression" },
      { blankLine: "always", prev: "*", next: "switch" },
      { blankLine: "always", prev: "*", next: "block-like" },
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "*", next: "export" },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  globals: {
    chrome: "readonly",
  },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: [__dirname + "/tsconfig.json"],
      },
      node: {
        alias: {
          "@styles": [__dirname + "/src/assets/styles/scss"],
        },
      },
    },
    react: {
      version: "detect",
    },
  },
};
