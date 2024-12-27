// eslint-disable-next-line n/no-unpublished-import
import { base, browser } from '@egy186/eslint-config';
// eslint-disable-next-line n/no-unpublished-import
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved, n/no-unpublished-import
import { typescriptConfig } from '@egy186/eslint-config/typescript';

const config = [
  { ignores: ['dist'] },
  {
    ...base,
    files: ['lib/**/*.ts', '*.{mjs,js}']
  },
  {
    ...browser,
    files: ['src/**/*.ts'],
    languageOptions: {
      ...browser.languageOptions,
      globals: {
        ...browser.languageOptions.globals,
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
  },
  typescriptConfig({ projectService: { allowDefaultProject: ['lib/*.ts'] } })
];

export default config;
