import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/plugins/priscillaAI.ts', import.meta.url)),
      name: 'PriscillaAI',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    cssCodeSplit: true,
    rollupOptions: {
      external: ['vue', 'axios'],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios'
        },
        assetFileNames: "index.css"
      }
    }
  }
})