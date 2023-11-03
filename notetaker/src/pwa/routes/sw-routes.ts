import {registerRoute} from 'workbox-routing';
import { isOnline } from '../services/network';
import { Note } from '../models/note';
import { useQueue } from '../services/request-queue';

const requestQueue = useQueue();


async function sendFetch(request: Request){

  if (!await isOnline()) {
    throw new Error('No internet!');
  }
  const res = await fetch(request.clone());
  if (res.status === 500) {
    throw new Error('Server error!');
  }
  return res;
}


registerRoute(
  // matcher
  ({url, request, event}) => {
    return url.pathname === '/api/notes';
  },
  // handler
  async ({event, request, url, params}) => {

    
    // attempt to relay request to api server
    try{
      const res = await sendFetch(request);

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


registerRoute(
  ({url}) => {
    return url.pathname.match('/api/notes/*')
  },
  async ({request, url}) => {
    const noteId = url.pathname.split('/').slice(-1)[0];
    
    try{
      const res = await sendFetch(request);

      try{
        const response = await res.clone().json();
        await Note.update(noteId, response);
  
      }catch(err){
        console.log('errr', err);
      }
      return res;
    }catch(err){
      const note = await Note.get(noteId);
      console.log({note});
      return new Response(JSON.stringify(note));
    }
  },
  'GET'
)


registerRoute(
  ({url}) => url.pathname.match(/\/api\/notes$/g),
  async ({request}) => {
    try{
      const res = await sendFetch(request);

      const resBody = await res.clone().json();
      try{
        await Note.update(resBody.id, resBody);
      }catch(err){
        console.log('err', err);
      }
      return res;
    }catch(err){
      console.error(err);
      // cloning because body can only be read once
      const body = await request.clone().json();
      const note = await Note.create(body);

      // store in req queue
      if(note._id){
        await requestQueue.add(request.clone(), note._id);
      }

      return new Response(JSON.stringify(note));

    }

  },
  'POST'
)


registerRoute(
  ({url}) => url.pathname.match(/^\/api\/notes\/[a-zA-Z\d\-]+$/g),
  async ({request, url}) => {

    const id = url.pathname.split('/').slice(-1)[0];
    try{

      const res = await sendFetch(request);
      try{
        await Note.update(id, await res.clone().json());
      }catch(err){
        console.error(err);
      }

      return res;

    }catch(err){

      const idbNote = await Note.get(id);
      const isCreatedOffline = !!idbNote?._id;

      const body = await request.clone().json();

      const noteUpdated = await Note.update(id, {...idbNote, ...body});

      if(!isCreatedOffline){
        await requestQueue.update(request.clone(), id);
      }

      return new Response(JSON.stringify(noteUpdated));

    }

  },
  'PATCH'
)