import IndexedDBBase from './IndexedDBBase'

export default class UserDB {
	constructor() {
	  let options={};
	  options.version = 2;
    options.storesName = "user";

    this.indexedDBBase = new IndexedDBBase(options)
	}
	add(obj) {
    this.indexedDBBase.add(obj);
	}

	put(obj) {
    this.indexedDBBase.put(obj);
	}

	delete(key) {
    this.indexedDBBase.delete(key);
	}
	clear() {
    this.indexedDBBase.clear();
	}
	close(){
    this.indexedDBBase.close();
  }
  getAll(){
    return new Promise((resolve, reject) => {
      this.indexedDBBase.getAll().then((obj) => {
        resolve(obj);
      })
    })
  }
}
