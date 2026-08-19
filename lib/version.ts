import { readFile, writeFile } from 'node:fs/promises';
import pkg from '../package.json' with { type: 'json' };

// Update update manifest
const updateManifestFile = new URL('../docs/updates.json', import.meta.url);
const updateManifest = JSON.parse(await readFile(updateManifestFile, 'utf8')) as {
  readonly addons: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    readonly '@code-viewer': {
      readonly updates: Array<{
        // eslint-disable-next-line @typescript-eslint/naming-convention
        readonly update_link: string;
        readonly version: string;
      }>;
    };
  };
};
updateManifest.addons['@code-viewer'].updates.push({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  update_link: `https://github.com/egy186/code-viewer/releases/download/v${pkg.version}/code_viewer-${pkg.version}.xpi`,
  version: pkg.version
});
await writeFile(updateManifestFile, `${JSON.stringify(updateManifest, null, '  ')}\n`, 'utf8');
