import { base, browser } from '@egy186/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { typescript } from '@egy186/eslint-config/typescript';

const config = defineConfig([
  globalIgnores(['dist']),
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
]);

export default config;
