(function(){
	
	var NoteList = function() {
		this.notesInPage = 10;
		this.currentPage = 0;
	};

	NoteList.prototype.addEvents = function() {
		var self = this;

		document.addEventListener("note-list__search", function(e){
			// console.log(e.detail);
		}, false);


		/**/
		var firstDBRequest = 2;

		document.addEventListener("COMRenderEnd", function(e){
			firstDBRequest--;
			if(!firstDBRequest){
				self.emit("noteDb__get", {
					start : self.currentPage * self.notesInPage,
					end : (self.currentPage + 1) * self.notesInPage
				});
			}
		});

		document.addEventListener("noteDb__DBCreated", function(e){
			firstDBRequest--;
			if(!firstDBRequest){
				self.emit("noteDb__get", {
					start : self.currentPage * self.notesInPage,
					end : (self.currentPage + 1) * self.notesInPage
				});
			}
		});
		/**/


		document.addEventListener("noteDb__notes", function(e){
			var noteParams = self.packParams(e.detail);
			self.setParams({
				note: noteParams
			});
		});
		
		document.addEventListener("noteDb__changed", function(e) {
			self.emit("noteDb__get", {
				start : self.currentPage * self.notesInPage,
				end : (self.currentPage + 1) * self.notesInPage
			});
			return false;
		}, false);

	};

	NoteList.prototype.packParams = function(params) {
		var packedParams = [];

		for (var i = 0; i < params.length; i++) {
			packedParams.push({
				html : {
					noteId : params[i].id
				},
				lastname : {
					value : params[i].lastname
				},
				firstname : {
					value : params[i].firstname
				},
				phone : {
					value : params[i].phone
				},
				email : {
					value : params[i].email
				}
			});
		}

		return packedParams;
	};

	return NoteList;

})();