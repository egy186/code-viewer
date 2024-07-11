import { readFile, writeFile } from 'node:fs/promises';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

// Update manifest
const manifestFile = new URL('../src/manifest.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestFile, 'utf8'));
manifest.version = version;
await writeFile(manifestFile, `${JSON.stringify(manifest, null, '  ')}\n`, 'utf8');

// Update update manifest
const updateManifestFile = new URL('../docs/updates.json', import.meta.url);
const updateManifest = JSON.parse(await readFile(updateManifestFile, 'utf8'));
updateManifest.addons['@code-viewer'].updates.push({
  update_link: `https://github.com/egy186/code-viewer/releases/download/v${version}/code_viewer-${version}.xpi`,
  version
});
await writeFile(updateManifestFile, `${JSON.stringify(updateManifest, null, '  ')}\n`, 'utf8');
