import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'
import { url } from './sw';
import { setupPicture } from './picture';
import { buffDoge, doge } from './data';
import { setupVideo } from './video';
import yesVideo from './assets/videos/yes5.mp4';

console.log({url});

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>

    <div id="display">
    </div>

    <div class="card">
      <button id="yes" type="button">Yes</button>
      <button id="btn-show-pic1" type="button">Buff Doge</button>
      <button id="btn-show-pic2" type="button">Doge</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

const displayEl = document.getElementById('display');
setupPicture(document.querySelector('#btn-show-pic1'), displayEl, buffDoge);
setupPicture(document.querySelector('#btn-show-pic2'), displayEl, doge);
setupVideo(document.querySelector('#yes'), displayEl, yesVideo);

if(window.navigator.serviceWorker){
  try{
    window.navigator.serviceWorker.register(url, {
      scope: '/',
      type: 'module'
    })
  }catch(err){
    console.error(err);
  }


}
