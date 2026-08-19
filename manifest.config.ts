/* eslint-disable @typescript-eslint/naming-convention */

import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json' with { type: 'json' };

const manifest = defineManifest({
  browser_specific_settings: {
    gecko: {
      data_collection_permissions: {
        required: ['none']
      },
      id: '@code-viewer',
      strict_min_version: '142.0',
      update_url: 'https://egy186.github.io/code-viewer/updates.json'
    }
  },
  content_scripts: [
    {
      js: ['src/index.ts'],
      matches: ['<all_urls>'],
      run_at: 'document_end'
    }
  ],
  description: pkg.description,
  homepage_url: pkg.homepage,
  icons: {
    48: 'assets/icon.png',
    96: 'assets/icon@2x.png'
  },
  manifest_version: 3,
  name: 'Code Viewer',
  options_ui: { page: 'options.html' },
  permissions: ['activeTab', 'storage'],
  version: pkg.version,
  web_accessible_resources: [
    {
      matches: ['<all_urls>'],
      resources: ['resources/*']
    }
  ]
});

export default manifest;
