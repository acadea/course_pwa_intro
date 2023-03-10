import { defineConfig } from "vite";


export default defineConfig({

  build: {
    target: 'es2015',
    outDir: 'dist',

    assetsDir: './',

    rollupOptions: {
      input: {
        index: 'index.html',
        main: 'main.js',
        sw: 'sw.js',
      }
    }
  }
});