import { v4 } from 'uuid';
import { connect } from '../database/connect';
import { INote } from './../../types/note.d';


export const Note = {

  _tableName: 'notes',

  transact(){
    return connect().then(db => db.transaction(this._tableName, 'readwrite'));
  },

  async get(id: string){
    const transaction = await this.transact();
    const store = transaction.objectStore(this._tableName);
    return store.get(id);
  },

  async getAll(){

    const transaction = await this.transact();
    const store = transaction.objectStore(this._tableName);
    return store.getAll();

  },

  async create(payload: INote){
    

    const transaction = await this.transact();
    const store = transaction.objectStore(this._tableName);

    if(store === undefined){
      throw new Error('Cant find store');
    }

    const note = {
      id: payload.id || v4(),
      ...payload,
    }

    // we should indicate if the note was created offline
    if(!payload.id){
      note._id = note.id;
    }
    await store.add(note);
    await transaction.done;
    return note;
  },

  async update(id: string, payload: INote){
    const transaction = await this.transact();
    const store = transaction.objectStore(this._tableName);
    store.put({
      ...payload,
      id,
    })

  },

  async delete(id: string){
    const transaction = await this.transact();
    const store = transaction.objectStore(this._tableName);
    await store.delete(id);
    await transaction.done;
  }



}