import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { generateSW, injectManifest } from "workbox-build";






export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'script',
      strategies: 'injectManifest',
      srcDir: '/',
      filename: 'sw.js',
      devOptions: {
        enabled: true,
        type: 'module',
      }

    })
  ],
  build: {
    target: 'es2015',
    outDir: 'dist',

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