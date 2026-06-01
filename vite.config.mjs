import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    manifest: true,
    outDir: 'dist',
    emptyOutDir: true,

    rolldownOptions: {
      input: {
        resourceGate: resolve(import.meta.dirname, 'src/main.js'),
      },

      output: {
        format: 'iife',
        name: 'AthenaResourceGateBundle',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
});