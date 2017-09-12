(function(){
	
	var noteDb = function(){
		var self = this;
		this._db;
		this._dbName = "azNote";
		var openRequest = indexedDB.open(this._dbName, 8);
		openRequest.onupgradeneeded = function(e){
			var db = e.target.result;
			if(!db.objectStoreNames.contains("phone")){
				db.createObjectStore("phone", {autoIncrement: true});
			}
		};
		openRequest.onsuccess = function(e){
			self._db = e.target.result;
		};
		openRequest.onerror = function(e){
			var err = e.target.error;
			console.err(err.name + " : " + err.message);
		}
	};

	noteDb.prototype.addEvents = function(){
		var self = this;

		document.addEventListener("noteDb__add", function(e){
			self.add(e.detail);
		});

		document.addEventListener("noteDb__get", function(e){
			self.get(1, 10, function(result){
				self.emit("noteDb__get_result", result);
			});
		});

	};

	noteDb.prototype.get = function(nth, num, callback, error){
		if (!this._db){
			error("не создана база данных");
		} 
		var result = [];
		// var keyRangeValue = IDBKeyRange.bound((nth-1)*num, nth*num, false, true);
		var request = this._db.transaction(["phone"], "readonly").objectStore("phone").openCursor();
		request.onsuccess = function(e){
			var cursor = e.target.result;
			var start = nth;
			var end = nth + num;
			if(cursor && start<end){
				result.push(cursor.value);
				start++;
				cursor.continue();
			} else {
				callback(result);
			}
		};
		request.onerror = function(e){};
	};

	noteDb.prototype.add = function(obj){
		this._db.transaction(["phone"], "readwrite").objectStore("phone").add(obj);
	};

	noteDb.prototype.put = function(obj, key){
		this._db.transaction(["phone"], "readwrite").objectStore("phone").put(obj, key);
	};

	return noteDb;

})();