console.log('heyya');

// lifecycle

// 1. register

// 2. install
self.addEventListener('install', (e) => {
  console.log('install');
  self.skipWaiting();

})
// 3. activate
// once activated, can start to handle push and sync events
// ready to control clients (window or tabs)
self.addEventListener('activate', (e) => {
  console.log('activate');
})

// 4. update
// update is triggered when sw has different size
// new worker will wait till current worker controls 0 clients




self.addEventListener('fetch', async (e) => {

  if(e.request.method.toUpperCase() !== 'POST'){
    return;
  }
  console.log(e.request);

  const request = e.request.clone();

  
  
  // const body = e.request.formData();


  // fetch(request);

  // console.log({body});

  async function mock(){
    const body = await e.request.json();
    
    return new Response(JSON.stringify({
      mock: 'hohoho',
    }))
  }

  return e.respondWith( mock() );


})