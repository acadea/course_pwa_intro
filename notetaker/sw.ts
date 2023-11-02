import { Note } from './src/pwa/models/note';
import {precacheAndRoute} from 'workbox-precaching';
import './src/pwa/routes/sw-routes';

precacheAndRoute(self.__WB_MANIFEST || []);


(async function(){

  // const note = await Note.create({
  //   body: 'abc',
  //   title: '123'
  // });
  // console.log('note created', note);

})()