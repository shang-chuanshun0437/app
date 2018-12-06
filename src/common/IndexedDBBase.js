export default class IndexedDBBase {

	constructor(options) {
	  this.name = "easy";
	  this.version = options.version;
	  this.storesName = options.storesName;
	}
	getDB() {
		return new Promise((resolve, reject) => {
			let request = self.indexedDB.open(this.name, this.version);

			//当数据库的版本更新时，会自动调用
      request.onupgradeneeded = function(event) {
        var db = event.target.result;
        db.createObjectStore("user", {keyPath: "userPhone"});
        // 创建一个对象存储空间来持有有关我们客户的信息。
        //var objectStore = db.createObjectStore("user", {keyPath: "userPhone"});
        // 创建一个索引来通过 name 搜索客户。
        //objectStore.createIndex("name", "name", {unique: false});
      }

      request.onerror = (e) => {
        reject(e)
      }
      request.onsuccess = (e) => {
        console.log("IndexedDB onsuccess success")
        resolve(e.target.result)
      }
		})
	}
	close() {
		return this.getDB().then((db) => {
			db.close()
		})
	}

	add(obj) {
    this.getDB().then((db) => {
      console.log(this.storesName);
      var transaction = db.transaction([this.storesName], "readwrite");
      var objectStore = transaction.objectStore(this.storesName);
      var request = objectStore.add(obj);
      request.onsuccess = function(event) {
        console.log("IndexedDB add success")
      };
    })
	}

	put(obj) {
    this.getDB().then((db) => {
      console.log(this.storesName);
      var transaction = db.transaction([this.storesName], "readwrite");
      var objectStore = transaction.objectStore(this.storesName);
      var request = objectStore.put(obj);
      request.onsuccess = function(event) {
        console.log("IndexedDB put success")
      };
    })
	}

	delete(key) {
    this.getDB().then((db) => {
      console.log(this.storesName);
      var transaction = db.transaction([this.storesName], "readwrite");
      var objectStore = transaction.objectStore(this.storesName);
      var request = objectStore.delete(key);
      request.onsuccess = function(event) {
        console.log("IndexedDB delete success")
      };
    })
	}
	clear() {
    this.getDB().then((db) => {
      console.log(this.storesName);
      var transaction = db.transaction([this.storesName], "readwrite");
      var objectStore = transaction.objectStore(this.storesName);
      var request = objectStore.clear();
      request.onsuccess = function (event) {
        console.log("IndexedDB clear success")
      };
    })
  }
  getAll() {
    return new Promise((resolve, reject) => {
      this.getDB().then((db) => {
        console.log(this.storesName);
        var transaction = db.transaction([this.storesName], "readwrite");
        var objectStore = transaction.objectStore(this.storesName);
        var request = objectStore.getAll();
        request.onsuccess = function (event) {
          console.log("IndexedDB getAll success")
          resolve(request.result[0])
        };
      })
    })
  }
}
