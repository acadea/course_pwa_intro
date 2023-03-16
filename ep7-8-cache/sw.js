import {buffDoge} from './data';
import YesVid from './assets/videos/yes5.mp4';
// static cache -- known items to cache eg img, videos, html, js, css

// runtime cache -- dynamic items, eg search results

if(self.constructor.name === 'ServiceWorkerGlobalScope'){

  // sw code here...
  main();
  self.addEventListener('fetch', async (event) => {
    if(event.request.method === 'GET' && event.request.mode !== 'navigate'
     && (event.request.headers.get('accept').includes("image/") || event.request.url.endsWith('.mp4'))
    ){
      console.log('Handling fetch for ', event.request.url);
      
      // attempt to get from cache
      event.respondWith(
        caches.open('v1')
          .then((cacheStore) => {
            return cacheStore.match(event.request);
          })
          .then((result) => {
            console.log('result is ', result);
            // if not found then send req to the internet
            if(!result){
              return fetch(event.request);
            }
            return result;
          })
          .catch((err) => {
            console.log('error:', err);
          })
      )


    }


  })

}

async function main(){

  const cacheStore  = await caches.open('v1');

  const res = await fetch(buffDoge, {
    mode: 'no-cors'
  });

  // if(!res.ok){
  //   throw new Error('ERROR!!!');
  // }

  await cacheStore.put(buffDoge, res);


  cacheStore.add(YesVid);

  // cacheStore.addAll([

  // ])

  // remove
  // cacheStore.delete(buffDoge);

  const keys = await cacheStore.keys();
  console.log(keys);

  // cacheStore.add(buffDoge);
  // add is a shorthand for: 
  // fetch(url).then((response) => {
  //   if (!response.ok) {
  //     throw new TypeError("Bad response status");
  //   }
  //   return cache.put(url, response);
  // });


}


// get the actual url path of this file
const url = import.meta.url;

export {
  url,
}