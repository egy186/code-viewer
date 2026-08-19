import { join, relative, sep } from 'node:path';
import type { Dirent } from 'node:fs';
import type { Plugin } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { glob } from 'node:fs/promises';
import manifest from './manifest.config.js';

interface ThemeInfo {
  readonly name: string;
  readonly value: string;
}

const themeList = async (): Promise<ReadonlyArray<ThemeInfo>> => {
  const rootDir = fileURLToPath(new URL('node_modules/highlight.js/styles', import.meta.url));
  const files = (await Array.fromAsync(glob('**/*.min.css', {
    cwd: rootDir,
    withFileTypes: true
  }))).filter((file: Readonly<Dirent>) => file.isFile());

  return files
    .map((file: Readonly<Dirent>) => {
      const dir = relative(rootDir, file.parentPath);
      const value = join(dir, file.name)
        .replaceAll(sep, '/')
        .replace(/\.min\.css$/iu, '');
      return value;
    })
    .toSorted()
    .map(value => {
      const name = value
        .replaceAll('-', ' ')
        .replaceAll('/', ' / ')
        .replaceAll(/\b\w/gu, c => c.toUpperCase());
      return {
        name,
        value
      };
    });
};

const injectThemeList = (): Plugin => ({
  name: 'inject-theme-list',
  async transformIndexHtml (html: string): Promise<string> {
    const list = await themeList();
    const options = list.map(({ name, value }) => {
      const selected = value === 'default' ? ' selected' : '';
      return `<option value="${value}"${selected}>${name}</option>`;
    }).join('\n');
    return html.replace(
      '<!-- THEME_LIST -->',
      options
    );
  }
});

const config = defineConfig({
  build: {
    rollupOptions: {
      input: {
        script: 'src/resources/js/script.ts',
        style: 'src/resources/css/style.css'
      },
      output: {
        assetFileNames: 'resources/css/[name][extname]',
        entryFileNames: 'resources/js/[name].js'
      }
    }
  },
  plugins: [injectThemeList(), crx({ manifest })]
});

export default config;
