import globals from 'globals'
import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from "eslint-config-prettier";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
  ...compat.extends('prettier'),
  ...compat.extends('plugin:prettier/recommended'),
  ...eslintConfigPrettier
]

export default eslintConfig
