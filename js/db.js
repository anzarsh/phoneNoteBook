(function(){
	
	var noteDb = function(){
		var self = this;
		this._db;
		this._dbName = "azNote";
		var openRequest = indexedDB.open(this._dbName);
		openRequest.onupdateneeded = function(e){
			var db = e.target.result;
			if(db.objectStoreNames.containes("phone"))
				db.createObjectStore("phone", {autoIncrement: true});
		};
		openRequest.onsuccess = function(e){
			self._db = e.target.result;
		};
		openRequest.onerror = function(e){
			var err = e.target.error;
			console.err(err.name + " : " + err.message);
		}
	};

	noteDb.prototype.get = function(nth, num, callback, error){
		if (!this._db){
			error("не создана база данных");
		} 
		var result = [];
		var keyRangeValue = IDBKeyRange.bound((nth-1)*num, nth*num, false, true);
		var request = this._db.transaction([this._dbName], "readonly").objectStore(this._dbName).openCursor(keyRangeValue);
		request.onsuccess = function(e){
			var cursor = e.target.result;
			if(cursor){
				result.push(cursor.value);
			} else {
				callback(result);
			}
		};
		request.onerror = function(e){};
	};

	noteDb.prototype.add = function(obj){
		this._db.transaction([this._dbName], "readwrite").objectStore(this._dbName).add(obj);
	};

	noteDb.prototype.put = function(obj, key){
		this._db.transaction([this._dbName], "readwrite").objectStore(this._dbName).put(obj, key);
	};

	window.note = window.note || {};
	window.note.noteDb = noteDb;

})();