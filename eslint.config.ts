import { base, browser } from '@egy186/eslint-config';
import type { Linter } from 'eslint';
import globals from 'globals';
import { typescript } from '@egy186/eslint-config/typescript';

const config = [
  { ignores: ['dist'] },
  base,
  {
    ...browser,
    files: ['src/**/*.ts'],
    languageOptions: {
      ...browser.languageOptions,
      globals: {
        ...browser.languageOptions.globals,
        ...globals.webextensions
      }
    }
  },
  typescript
] as const satisfies Linter.Config[];

export default config;
