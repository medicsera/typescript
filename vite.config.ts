import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/vue-v3',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/scss/base" as *;
          @use "@/scss/mixins" as *;
          @use "@/scss/variables" as *;
        `
      }
    }
  }
})
