(function(){
	
	var noteDb = function() {
		var self = this;
		this._db;
		this._dbName = "azNote";
		var openRequest = indexedDB.open(this._dbName, 8);
		openRequest.onupgradeneeded = function(e){
			var db = e.target.result;
			if(!db.objectStoreNames.contains("phone")) {
				db.createObjectStore("phone", {autoIncrement: true});
			}
		};
		openRequest.onsuccess = function(e) {
			self._db = e.target.result;
			self.emit("noteDb__DBCreated");
		};
		openRequest.onerror = function(e) {
			var err = e.target.error;
			console.err(err.name + " : " + err.message);
		}
	};

	noteDb.prototype.addEvents = function() {
		var self = this;

		document.addEventListener("noteDb__add", function(e) {
			self.add(e.detail, function(e){
				self.emit("noteDb__changed");
			});
		});

		document.addEventListener("noteDb__put", function(e) {
			self.put(e.detail.obj, e.detail.key, function(e){
				self.emit("noteDb__changed");
			});
		});

		document.addEventListener("noteDb__delete", function(e) {
			self.delete(e.detail, function(e){
				self.emit("noteDb__changed");
			});
		});

		document.addEventListener("noteDb__get", function(e) {
			self.get(e.detail.start, e.detail.end, function(result){
				self.emit("noteDb__notes", result);
			}, function(error){
				console.error(error);
			});
		});
	};

	noteDb.prototype.get = function(start, end, success, error) {
		if (!this._db) {
			error("не создана база данных");
		} 
		var result = [];
		var current = 0;
		var request = this._db.transaction(["phone"], "readonly")
										.objectStore("phone").openCursor();
		request.onsuccess = function(e){
			var cursor = e.target.result;
			if(cursor && start <= current && current < end){
				var value = cursor.value;
				value.id = cursor.key;
				result.push(cursor.value);
				current++;
				cursor.continue();
			} else {
				success(result);
			}
		};
		request.onerror = function(e) {
			error(e);
		};
	};

	noteDb.prototype.add = function(obj, success) {
		this._db.transaction(["phone"], "readwrite").objectStore("phone")
			.add(obj).onsuccess = success;
	};

	noteDb.prototype.put = function(obj, key, success) {
		this._db.transaction(["phone"], "readwrite").objectStore("phone")
			.put(obj, key).onsuccess = success;
	};

	noteDb.prototype.delete = function(key, success) {
		this._db.transaction(["phone"], "readwrite").objectStore("phone")
			.delete(key).onsuccess = success;
	};

	return noteDb;

})();