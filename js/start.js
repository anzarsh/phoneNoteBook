(function(){
	
	var Start = function(){
		this._startTime = new Date();
		this._loadedTime;


		var self = this;
		// this.db = new note.noteDb();
		this.components = new note.ComponentLoader();
		this.components.load({
			components : note.components,
			modules : note.modules,
			processing : function(){

				self._startTime = new Date();
				
				console.log("processing");
			},
			success : function(){
				self.components.insertIn(document.body);
				console.log("success");

				self._loadedTime = new Date();
				console.log(self._loadedTime - self._startTime);

			},
			error : function(e){
				console.error(e);
			},
			warning : function(e){
				console.info(e);
			}
		});
	};

	window.note = window.note || {};
	window.note.Start = Start;


})();