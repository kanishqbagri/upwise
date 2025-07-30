import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '/upwise/',
    publicDir: 'public',
    build: {
      // Use a more compatible build target
      target: 'es2015',
      rollupOptions: {
        output: {
          // Bundle everything into a single file to avoid module issues
          format: 'iife',
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
          // Remove module type from script tags
          manualChunks: undefined,
        },
      },
      // Ensure no module type is added
      modulePreload: false,
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    }
  };
});

