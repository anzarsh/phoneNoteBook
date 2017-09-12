(function(){
	
	var components = {
		"controls" : "components/controls",
		"note-list" : "components/note-list",
		"note" : "components/note",
		"popup-add-note" : "components/popup-add-note"
	};

	var modules = {
		"noteDb" : "components/noteDb"
	};

	window.note = window.note || {};
	window.note.components = components;
	window.note.modules = modules;

})();