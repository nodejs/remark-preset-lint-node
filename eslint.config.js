import eslint from "@eslint/js";
import node from "eslint-plugin-n";
import prettier from "eslint-plugin-prettier/recommended";

import globals from "globals";

export default [
  eslint.configs.recommended,
  node.configs["flat/recommended"],
  prettier,
  {
    ignores: ["/tmp"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.es2021,
        ...globals.node,
      },
    },
  },
  {
    files: ["./test/test.js"],
    rules: {
      "node/no-extraneous-import": "off",
    },
  },
];
