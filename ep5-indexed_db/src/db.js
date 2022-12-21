
// object store -- table

import { openDB } from "idb";

// row -- record

// field -- column

// keyPath -- primary key / identifier of the record

// index -- index

const version = 1;
const db = await openDB('matey', version, {

  upgrade(db, oldVersion, newVersion, transaction, event){

    const store = db.createObjectStore('users', {
      keyPath: 'id',
      autoIncrement: true,
    });

    store.createIndex('name', 'name', {
      unique: true,
    })

  }

});


export async function main(){
  const tx = db.transaction('users', 'readwrite');

  const store = tx.objectStore('users');


  // for (let index = 0; index < 3; index++) {  
  //   await store.add({
  //     name: 'abc' + index,
  //     age: 12 + index,
  //   })
  // }

  const users = await store.getAll();

  console.log({users});


  await store.put({
    name: 'abc',
    age: 123,
    id: users[0].id,
  })

  await store.delete(2);

}

main();