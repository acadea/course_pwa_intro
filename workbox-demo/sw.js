import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {CacheFirst, CacheOnly, NetworkFirst, NetworkOnly, StaleWhileRevalidate} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

if(self.constructor.name === 'ServiceWorkerGlobalScope'){
  const noop = true;

  if(noop){
    self.addEventListener('install', () => {
    
      // Skip over the "waiting" lifecycle state, to ensure that our
      // new service worker is activated immediately, even if there's
      // another tab open controlled by our older service worker code.
      self.skipWaiting();
    });
    
    self.addEventListener('activate', () => {
      self.clients.matchAll({
        type: 'window'
      }).then((windowClients) => {
        windowClients.forEach((windowClient) => {
          windowClient.navigate(windowClient.url);
        })
      })
    });
  }else{
    main();
  }

}

async function main(){

  precacheAndRoute(self.__WB_MANIFEST || []);


  // cache first
  // registerRoute(

  //   // MUST be synchronous
  //   ({event, request, url}) => {
  //     console.log({ event, request, url });
  //     return 'hey';
  //   },
  //   async ({event, request, url, params}) => {
  //     console.log({params}); // hey

  //     return new Response(JSON.stringify({
  //       data: 'ok',
  //     }))
  //   },
  //   'GET'
  // )
  registerRoute(({request}) => {
    return request.destination === 'image';
  }, new NetworkFirst({
    cacheName: 'imagey',
    plugins: [
      new ExpirationPlugin({

        maxAgeSeconds: 60 * 60 * 24 * 30, // a month,
        maxEntries: 50,
      })
    ]
  }));






}