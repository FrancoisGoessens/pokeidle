import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: isProd ? '/pokeidle/' : '/',
  plugins: [vue(), vuetify({ autoImport: true })],
})