import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      apply: 'build',
      include: [/\.(ux?|tsx?|cjs|mjs)$/], 
      exclude: [/node_modules/],

      options: {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: true,
        debugProtection: true,
        stringArray: true,
      }
    })
  ],
})
