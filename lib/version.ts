import { readFile, writeFile } from 'node:fs/promises';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as { readonly version: string };

// Update manifest
const manifestFile = new URL('../src/manifest.json', import.meta.url);
const oldManifest = JSON.parse(await readFile(manifestFile, 'utf8')) as { readonly version: string };
const manifest = {
  ...oldManifest,
  version
};
await writeFile(manifestFile, `${JSON.stringify(manifest, null, '  ')}\n`, 'utf8');

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
  update_link: `https://github.com/egy186/code-viewer/releases/download/v${version}/code_viewer-${version}.xpi`,
  version
});
await writeFile(updateManifestFile, `${JSON.stringify(updateManifest, null, '  ')}\n`, 'utf8');
