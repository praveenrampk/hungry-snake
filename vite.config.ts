import path, { resolve } from 'path';
import { crx, defineManifest } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import manifest from './src/app/manifest/manifest';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env = { ...process.env, ...env };

  const root = resolve(__dirname, 'src');
  const appDir = resolve(root, 'app');
  const pagesDir = resolve(root, 'pages');
  const assetsDir = resolve(root, 'assets');
  const helpersDir = resolve(root, 'helpers');
  const hooksDir = resolve(root, 'hooks');
  const stylesDir = resolve(assetsDir, 'styles/scss');
  const sharedKernelDir = resolve(root, 'shared-kernel');

  const browser = process.env.BROWSER ?? 'chrome';
  const outDir = resolve(__dirname, browser ? `dist/${browser}` : 'dist');
  const publicDir = resolve(__dirname, 'public');

  const isDev = mode === 'development';
  const isProduction = mode === 'production';

  return {
    resolve: {
      alias: {
        '@src': root,
        '@assets': assetsDir,
        '@pages': pagesDir,
        '@helpers': helpersDir,
        '@hooks': hooksDir,
        '@styles': stylesDir,
        '@shared-kernel': sharedKernelDir,
      },
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      crx({
        manifest: defineManifest(manifest),
      }),
      nodePolyfills({
        globals: {
          Buffer: true,
          global: true,
          process: true,
        },
        protocolImports: true,
      }),
    ],
    publicDir,
    build: {
      chunkSizeWarningLimit: 6000,
      outDir,
      minify: isProduction,
      reportCompressedSize: isProduction,
      rollupOptions: {
        input: {
          devtools: resolve(appDir, 'devtools', 'index.html'),
          panel: resolve(appDir, 'panel', 'index.html'),
          popup: resolve(root, 'popup.html'),
        },
        watch: {
          include: ['src/**', 'vite.config.ts'],
          exclude: ['node_modules/**', 'src/**/*.spec.ts'],
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
          entryFileNames: 'src/[name]/index.js',
          chunkFileNames: isDev
            ? 'assets/js/[name].js'
            : 'assets/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const { dir, name: _name } = path.parse(assetInfo.name);
            const assetFolder = dir.split('/').at(-1);
            const name = assetFolder + firstUpperCase(_name);

            if (name === 'contentStyle') {
              return `assets/css/contentStyle${cacheInvalidationKey}.chunk.css`;
            }

            return `assets/[ext]/${name}.chunk.[ext]`;
          },
        },
        plugins: [],
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
        plugins: [],
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173,
      },
    },
  };
});

function firstUpperCase(str: string) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, 'g');

  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}

const cacheInvalidationKey = `${(Date.now() / 100).toFixed()}`;
