import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { generateSW, injectManifest } from "workbox-build";






export default defineConfig({
  plugins: [
    VitePWA({
      // inline: injects a simple register script, inlined in the application entry point
      // script: injects a script tag in the head with the service worker to a generated simple register
      // null(manual): do nothing, you will need to register the service worker yourself, or import any of the virtual modules exposed by the plugin
      // auto(default value): depends on whether you use any of the virtual modules exposed by the plugin, it will do nothing or switch to script mode
      injectRegister: 'script',
      // either be generateSW or injectManifest
      strategies: 'injectManifest',
      // the path to the sw src folder
      srcDir: './',
      filename: 'sw.js',
      devOptions: {
        enabled: true,
        type: 'module',
      },
      // injectManifest: {
        
      // }
      mode: 'development',
      scope: '/',

      outDir: './dist',

      // base url 
      base: '/',

      // includeAssets: ['file.*'],

      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },
      disable: false,


      manifest: {
        name: 'My PWAA App',
        short_name: "PWA App",

        // "fullscreen", -- hide the status bar (eg battery percentage, etc )
        // "standalone", -- no navigation but will still show device status bar
        // "minimal-ui", -- will show minimal ui of the browser,
        // "browser" -- display standard browser
        display: 'standalone',

        description: "What an amazing app!!",

        // The color used for the address bar, task switcher, or splash screen.
        theme_color: '#FFFFFF',


        // 192x192 pixels: Used for most Android devices and the home screen icon on Chrome for Android.
        // 512x512 pixels: Used as a high- resolution icon on some Android devices and the Microsoft Store.
        // 180x180 pixels: Used for Apple devices running iOS 7 and later versions, including iPhones and iPads.
        // 152x152 pixels: Used for Apple devices running iOS 6 and earlier versions.
        // 144x144 pixels: Used for Windows 8.1 devices.
        // 128x128 pixels: Used for Chrome Web Store icons.
        // 96x96 pixels: Used for some Android devices and older Chrome versions.
        // 48x48 pixels: Used for Chrome's extension toolbar icons.
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
        start_url: '/',

        background_color: '#ffffff',

        categories: ['lifestyle'],

        orientation: 'any',


      },
      // add the `crossorigin="use-credentials"` attribute to `<link rel="manifest">`
      useCredentials: false,

    })
  ],
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      plugins: [
        // {
        //   async writeBundle(){
        //     // generateSW({
        //     //   globDirectory: 'dist/',
        //     //   globPatterns: [
        //     //     '**/*.{css,woff2,png,svg,jpg,js}'
        //     //   ],
        //     //   swDest: 'dist/sw.js',
        //     // })

        //     // injectManifest({
        //     //   swSrc: 'sw.js',
        //     //   swDest: 'dist/sw.js',
        //     //   globDirectory: './dist',
        //     //   globPatterns: [
        //     //     '**/*.js',
        //     //     '**/*.css',
        //     //     '**/*.svg'
        //     //   ]
        //     // }).then((res) => {
        //     //   console.log('res is ', res);
        //     // }).catch((err) => {
        //     //   console.log('err is', err);
        //     // })
        //   }
        // }
      ]
    }
  }
});