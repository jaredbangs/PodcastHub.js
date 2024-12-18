import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {ignores: ["**/dist/"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { rules: {
    "@typescript-eslint/no-explicit-any": "off", // TODO: change to warn then error to eliminate any
  }}
];