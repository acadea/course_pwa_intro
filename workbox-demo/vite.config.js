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