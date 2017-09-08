(function(){
	
	var NoteList = function(){
		this.params = {
			note : [{
				lastname : "Щумахуа",
				firstname : "Анзар",
				phone : "+7 999 999 99 99",
				email : "anzarsh@mail.ru",
			},{
				lastname : "Щумахуа",
				firstname : "Анзар",
				phone : "+7 999 999 99 98",
				email : "anzarsh@mail.ru",
			},{
				lastname : "Щумахуа",
				firstname : "Анзар",
				phone : "+7 999 999 99 97",
				email : "anzarsh@mail.ru",
			},{
				lastname : "Щумахуа",
				firstname : "Анзар",
				phone : "+7 999 999 99 96",
				email : "anzarsh@mail.ru",
			},{
				lastname : "Щумахуа",
				firstname : "Анзар",
				phone : "+7 999 999 99 95",
				email : "anzarsh@mail.ru",
			}]
		}

		
	};

	NoteList.prototype.addEvents = function(){

		document.addEventListener("note-list__search", function(e){
			console.log(e.detail);
		}, false);

	};

	return NoteList;

})();