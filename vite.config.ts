import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const base = '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    cssCodeSplit: true,
    cssMinify: true,
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
});
