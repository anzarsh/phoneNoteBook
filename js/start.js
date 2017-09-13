(function(){
	
	var Start = function(){
		this._startTime = new Date();
		this._loadedTime;


		var self = this;
		// this.db = new note.noteDb();

		document.addEventListener("COMInit", function(e){
			console.log("COMInit");
		});

		document.addEventListener("COMLoadStart", function(e){
			console.log("COMLoadStart");
		});

		document.addEventListener("COMLoadEnd", function(e){
			console.log("COMLoadEnd");
		});

		document.addEventListener("COMLoadStarted", function(e){
			console.log("COMLoadStarted");
		});

		document.addEventListener("COMRenderStart", function(e){
			console.log("COMRenderStart");
		});

		document.addEventListener("COMRenderEnd", function(e){
			console.log("COMRenderEnd");
		});


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

		

		// document.addEventListener("COMRenderStart", function(e){
		// 	console.log("COMRenderStart");
		// });

		// document.addEventListener("COMRenderStart", function(e){
		// 	console.log("COMRenderStart");
		// });


	};

	window.note = window.note || {};
	window.note.Start = Start;


})();