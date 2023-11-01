import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx'
import './index.css'
// core styles are required for all packages
import '@mantine/core/styles.css';

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...
import '@mantine/tiptap/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <App />
  </MantineProvider>,
)


window.addEventListener('load', function(){

  if(!window.navigator.serviceWorker){
    return;
  }


  registerSW({
    onRegisterSW(){
      console.log('on registered')
    },
    onOfflineReady(){
      console.log('on offline ready')
    },
    onNeedRefresh(){
      console.log('on need refresh');
    }
  })

});
