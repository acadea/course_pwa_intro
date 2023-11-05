import { v4 } from "uuid";
import { connect } from "../database/connect"
import { isOnline } from "./network";
import { groupBy, isEmpty, remove } from "lodash";
import { Note } from "../models/note";

export function useQueue(){

  const _tableName = 'request_queues';
  function transact(){
    return connect().then(db => db.transaction(_tableName, 'readwrite'));
  }

  return {

    async add(request: Request, resourceId: string){

      // method, url, resourceId

      const transaction = await transact();

      const store = transaction.objectStore(_tableName);

      const payload = {
        id: v4(),
        method: request.method,
        url: request.url,
        resourceId,
      }

      await store.add(payload);
      await transaction.done;
      return payload;
    },

    async update(request: Request, resourceId: string){

      const transaction = await transact();

      const store = transaction.objectStore(_tableName);

      store.getAll()
        .then(requests => requests.find(
          (req) => req.resourceId === resourceId && req.url === request.url && req.method === request.method)
        )
        .then(target => {
          if(!target){
            store.put({
              id: v4(),
              method: request.method,
              url: request.url,
              resourceId,
            })
          }
        })
      await transaction.done;
      return true;
    },

    async removeByResourceId(id: string){
      const transaction = await transact();

      const store = transaction.objectStore(_tableName);

      store.getAll()
        .then(requests => requests.filter(req => req.resourceId === id))
        .then(filtered => filtered.forEach(req => store.delete(req.id)));

      await transaction.done;
      return true;
    },

    async removeById(id: string){
      const transaction = await transact();
      const store = transaction.objectStore(_tableName);
      store.delete(id)
      await transaction.done;
    },

    async getAll(){
      const transaction = await transact();
      const store = transaction.objectStore(_tableName);
      return store.getAll();
    },

    async sync(){

      function createRequest(request: any, body: any = {}){
        return new Request(request.url, {
          body: JSON.stringify(body),
          headers: {
            accept: 'application/json',
            'content-type': 'application/json'
          },
          method: request.method,
        })
      }

      if(!await isOnline()){
        console.log('sync failed app is not online');
        return false;
      }

      // get all req and group them by method
      const requests = await this.getAll();

      const keyedRequests = groupBy(requests, (req) => req.method);

      for (const method of ['DELETE', 'POST', 'PATCH']) {
        if(isEmpty(keyedRequests[method])){
          keyedRequests[method] = [];
        }
      }

      // DELETE, PATCH, POST
      // DELETE
      // only for online note
      // once delete, clear out all related PATCH in idb
      for (const request of keyedRequests['DELETE']) {
        const deleteHttp = createRequest(request);

        await fetch(deleteHttp);

        remove(keyedRequests['PATCH'], (req) => req.resourceId === request.resourceId);


        await Note.delete(request.resourceId);

        // remove from queue
        await this.removeById(request.id);

      }

      // POST
      // only for offline note,
      for (const request of keyedRequests['POST']) {
        
        const model = await Note.get(request.resourceId);
        const postHttp = createRequest(request, model);

        const response = await fetch(postHttp).then(res => res.json());

        // remove model in idb, id is no longer the temp uuid
        await Note.delete(model.id);
        // await Note.create({
        //   ...response,
        //   id: String(response.id),
        // });

        await this.removeById(request.id);
      }
      // PATCH
      // for offline -- need to be after all POST requests [not applicable]

      // for online -- can be anytime
      for (const request of keyedRequests['PATCH']) {
        const model = await Note.get(request.resourceId);
        cl
        const patchHttp = createRequest(request, model);

        const response = await fetch(patchHttp);

        await this.removeById(request.id);
      }



    }

  }
}