import { IDBPDatabase, openDB } from "idb";

let db: Promise<IDBPDatabase<unknown>>;
export async function connect(){

  if(db){
    return db;
  }

  db = openDB('notetaker', 1, {
    upgrade(db, oldVersion, newVersion, transaction, event){
      const store = db.createObjectStore('notes', {
        keyPath: 'id',
        autoIncrement: false,
      })

    }
  });

  return db;

}