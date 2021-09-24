import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    includeAssets: ['favicon.ico', 'robots.txt'],
    manifest: {
      name: 'QuranApp',
      short_name: 'Quran',
      description: 'a quran project',
      theme_color: '#00ccc2',
      icons: [
        {
          src: 'pwa_192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa_512x512.png',
          sizes: '512x512',
          type: 'image/png',
        }
      ]
    }
  })],
  server: {
    host: true,
    fs: {
      allow: ['..']
    }
  }

})
