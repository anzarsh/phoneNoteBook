(function(){
	
	var Start = function(){
		this.db = new note.noteDb();
	};

	window.note = window.note || {};
	window.note.Start = Start;

})();