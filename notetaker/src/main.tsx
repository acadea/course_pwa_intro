import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button, Group, MantineProvider, Text, createTheme } from '@mantine/core';
import {registerSW} from 'virtual:pwa-register';
import App from './App.tsx'
import './index.css'
// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'

// other css files are required only if
// you are using components from the corresponding package
// import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...
import '@mantine/tiptap/styles.css';
import { Notifications, notifications } from '@mantine/notifications';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <Notifications/>
    <App />
  </MantineProvider>,
)


window.addEventListener('load', function(){

  if(!window.navigator.serviceWorker){
    return;
  }

  let registration: ServiceWorkerRegistration|undefined;
  let refreshing: boolean = false;

  function updateSw(){

    // ask the new service worker to skipWaiting()
    if(!registration){
      return;
    }
    registration.waiting?.postMessage('skipWaiting');

  }

  window.navigator.serviceWorker.addEventListener('controllerchange', e => {
    if(refreshing){
      return;
    }
    refreshing = true;

    window.location.reload();
  })


  registerSW({
    onRegisteredSW(swUrl: string, swReg: ServiceWorkerRegistration){
      console.log('on registered');
      registration = swReg;
    },
    onOfflineReady(){
      console.log('on offline ready')
    },
    onNeedRefresh(){
      console.log('on need refresh');

      notifications.show({
        title: <Text size="xl">There is a new update!</Text>,
        message: (
          <Group justify="start">
            <Button onClick={updateSw}>Update</Button>
          </Group>
        ),
        autoClose: false,
      })

    }
  })

});
