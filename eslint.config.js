// eslint-disable-next-line n/no-unpublished-import
import { base, browser } from '@egy186/eslint-config';
// eslint-disable-next-line n/no-unpublished-import
import globals from 'globals';

const config = [
  { ignores: ['src/resources/lib'] },
  base,
  {
    ...browser,
    files: ['src/**/*.js'],
    languageOptions: {
      ...browser.languageOptions,
      globals: {
        ...globals.es2023,
        ...globals.browser,
        ...globals.webextensions
      }
    },
    rules: {
      ...browser.rules,
      '@stylistic/array-element-newline': [
        'error',
        {
          minItems: 2,
          multiline: true
        }
      ],
      'import/unambiguous': 'off'
    }
  }
];

export default config;
