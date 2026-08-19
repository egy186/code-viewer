import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';
import manifest from './manifest.config.js';

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
  plugins: [crx({ manifest })]
});

export default config;
