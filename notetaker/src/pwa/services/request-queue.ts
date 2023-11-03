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
    }

  }
}