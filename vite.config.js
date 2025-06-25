import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // so all paths are relative (important for Itch.io)
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});