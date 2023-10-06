module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./back/tsconfig.json", "./front/tsconfig.json"],
  },
  rules: {
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variableLike", "format": ["snake_case", "camelCase", "UPPER_CASE"]
      }
    ]
  },
};
