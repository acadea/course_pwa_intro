import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { generateSW } from "workbox-build";






export default defineConfig({
  plugins: [
    VitePWA({
      injectRegister: 'script'
    })
  ],
  build: {
    target: 'es2015',
    outDir: 'dist',

    rollupOptions: {
      plugins: [
        // {
        //   async generateBundle(){
        //     generateSW({
        //       globDirectory: 'dist/',
        //       globPatterns: [
        //         '**/*.{css,woff2,png,svg,jpg,js}'
        //       ],
        //       swDest: 'dist/sw.js',
        //     })
        //   }
        // }
      ]
    }
  }
});