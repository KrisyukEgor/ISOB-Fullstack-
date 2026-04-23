import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import obfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
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
          debugProtection: false,
          stringArray: true,
        }
      })
    ],
    server: {
      port: Number(env.VITE_PORT) || 5173,
    }
  }
})
