(function(){

	var Controls = function(){

	};

	Controls.prototype.addEvents = function(){
		var self = this;
		
		var word = self.html.elements.word;

		this.html.onsubmit = function(e){
			e.preventDefault();
			self.emit("note-list__search", word.value);
			self.emit("noteDb__get");
		};

		this.html.elements.word.onkeyup = function(e){
			e.preventDefault();
			self.emit("note-list__search", word.value);
		};

		this.html.elements.addPopup.onclick = function(e){
			e.preventDefault();
			self.emit("popup-add-note__open");
		};

		document.addEventListener("noteDb__get_result", function(e){
			console.log(e.detail);
		});

	};

	return Controls;

})();