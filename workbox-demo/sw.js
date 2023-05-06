import {precacheAndRoute} from 'workbox-precaching';

if(self.constructor.name === 'ServiceWorkerGlobalScope'){
  main();

}

async function main(){

  precacheAndRoute(self.__WB_MANIFEST || []);
}