import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {VitePWA} from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      //Disable service worker registration and generation on `build`
      disable: false,

      devOptions: {
        // PWA will not be registered, only the sw logic
        enabled: true,
        type: 'module',
      },
      // either be generateSW or injectManifest
      strategies: 'injectManifest',

      // inline: injects a simple register script, inlined in the application entry point
      // script: injects a script tag in the head with the service worker to a generated simple register
      // null(manual): do nothing, you will need to register the service worker yourself, or import any of the virtual modules exposed by the plugin
      // auto(default value): depends on whether you use any of the virtual modules exposed by the plugin, it will do nothing or switch to script mode
      injectRegister: null,

      // injectManifest: {
      //   injectionPoint: undefined,
      // },

      // development or production
      mode: 'development',

      // defining the scope of the sw
      scope: '/',

      // needed for injectManifest strategy
      // relative to project root. the sw src folder
      srcDir: './',
      // the name of our custom sw file, not the resulting sw, path relative to the srcDir folder
      filename: 'sw.ts',
      outDir: './dist',

      // base url for the pwa -- prefix for pwa related files
      base: '/',

      // `public` resources to be added to the PWA manifest.
      // includeAssets: [],

      // prompt or autoUpdate,
      // better to use prompt
      // registerType: 'prompt',


      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },

      manifest: {
        name: "Notey | The ultimate notesharing app",
        short_name: 'Notey',

        display: 'standalone',
        description: "An amazing note sharing app.",
        theme_color: "#ffffff",
        start_url: '/',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
      }
    })
  ],

  server: {

    proxy: {
      '^/api.*': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false
      }

    }

  }

})
