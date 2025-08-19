import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: '/',
    publicDir: 'public',
    build: {
      outDir: 'dist',
      target: 'es2015',
      rollupOptions: {
        output: {
          format: 'iife',
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name][extname]',
          manualChunks: undefined,
          exports: 'none',
        },
      },
      modulePreload: false,
      lib: undefined,
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

