import { v4 } from "uuid";
import { connect } from "../database/connect"

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
    }

  }
}