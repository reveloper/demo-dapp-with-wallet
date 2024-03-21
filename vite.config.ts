import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    tsconfigPaths()
  ],
  build: {
    outDir: 'docs'
  },
  // @ts-ignore
  // base: process.env.GH_PAGES ? '/demo-dapp-with-wallet/' : './',
  base: './',
  server: {
    fs: {
      allow: ['../sdk', './'],
    },
  },
})
