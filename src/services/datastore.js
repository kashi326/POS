import PouchDB from 'pouchdb';
import {
  createRxDatabase, addRxPlugin
} from 'rxdb';

addRxPlugin(require('pouchdb-adapter-idb'));
class Datastore {
  store = {};
  db = null;
  constructor() {
    this.store.products = new PouchDB('products');
    this.store.products.post({
      itemName: 'Hello World'
    });
    this.createDB();
  }

  async createDB(){
    this.db = await createRxDatabase({
      name: 'heroesdb', // <- name
      adapter: 'idb' // <- storage-adapter
    });
    console.log('DB' + this.db);
  }

  getProducts() {
    return this.store.products.allDocs({
      include_docs: true,
      descending: true
    });
  }
}

export default Datastore;