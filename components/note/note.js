(function(){
	
	var Note = function(){

	};

	Note.prototype.addEvents = function() {
		var self = this;

		this.html.elements.change.onclick = function(e) {
			var id = self.params.self.html.noteId;
			var sendData = {
				key : id,
				obj : {
					lastname : self.html.elements.lastname.value,
					firstname : self.html.elements.firstname.value,
					phone : self.html.elements.phone.value,
					email : self.html.elements.email.value
				}
			};
			self.emit("noteDb__put", sendData);
		};

		this.html.elements.delete.onclick = function(e) {
			var id = self.params.self.html.noteId;
			self.emit("noteDb__delete", id);
		};

	};

	return Note;

})();