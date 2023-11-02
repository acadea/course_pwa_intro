import {registerRoute} from 'workbox-routing';
import { isOnline } from '../services/network';
import { Note } from '../models/note';

registerRoute(
  // matcher
  ({url, request, event}) => {
    return url.pathname === '/api/notes';
  },
  // handler
  async ({event, request, url, params}) => {

    
    // attempt to relay request to api server
    try{
      if(!await isOnline()){
        throw new Error('No internet!');
      }
      const res = await fetch(request.clone());
      if(res.status === 500){
        throw new Error('Server error!');
      }

      // cache the response
      // if we get a success response from api server
      // we want to save all the notes in the response to idb, 
      // updating existing note if any
      try{
        const notes = await res.clone().json();

        for(const note of notes){
          await Note.update(String(note.id), note);
        }

      }catch(err){
        console.log('errr', err);
      }

      return res;
    }catch(err){
      // if not online or request returned 500,
      // then we will get the notes from local cache in idb
      const idbNotes = await Note.getAll();

      return new Response(JSON.stringify(idbNotes));

    }




  },

  'GET'
)