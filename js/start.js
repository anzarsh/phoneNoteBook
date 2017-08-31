(function(){
	
	var Start = function(){
		var self = this;
		this.db = new note.noteDb();
		this.components = new note.ComponentLoader();
		this.components.load({
			components : note.components,
			processing : function(){
				console.log("processing");
			},
			success : function(){
				self.components.insertIn(document.body);
				console.log("success");
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