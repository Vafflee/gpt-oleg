import typescriptEslint from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier, { rules } from "eslint-config-prettier";

export default [
  eslintConfigPrettier,
  {
    plugins: {
      typescriptEslint,
    },
  },
];
