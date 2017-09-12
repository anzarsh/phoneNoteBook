(function(){

	var PopupAddNote = function(){

	};

	PopupAddNote.prototype.addEvents = function(){
		var self = this;

		var lastname = this.html.elements.lastname;
		var firstname = this.html.elements.firstname;
		var phone = this.html.elements.phone;
		var email = this.html.elements.email;

		document.addEventListener("popup-add-note__open", function(e){
			self.show();
		}, false);

		document.addEventListener("popup-add-note__close", function(e){
			self.hide();
		}, false);

		document.addEventListener("popup-add-note__toggle", function(e){
			self.toggle();
		}, false);

		this.html.elements.mask.onclick = function(e){
			e.preventDefault();
			self.emit("popup-add-note__close");
		};

		this.html.elements.close.onclick = function(e){
			e.preventDefault();
			self.emit("popup-add-note__close");
		};
		
		this.html.elements.popup.onsubmit = function(e){
			e.preventDefault();
			self.emit("noteDb__add", {
				lastname : lastname.value,
				firstname : firstname.value,
				phone : phone.value,
				email : email.value
			});
		};
		
		document.addEventListener("keypress", function(e){
			if(self.html.elements.mask.classList.contains("popup-add-note__mask_on") && e.keyCode == 27){
				e.preventDefault();
				self.emit("popup-add-note__close");
			}
		});

	};

	PopupAddNote.prototype.show = function(){
		this.html.elements.popup.classList.add("popup-add-note__popup_on");
		this.html.elements.mask.classList.add("popup-add-note__mask_on");
	};

	PopupAddNote.prototype.hide = function(){
		this.html.elements.popup.classList.remove("popup-add-note__popup_on");
		this.html.elements.mask.classList.remove("popup-add-note__mask_on");
	};

	PopupAddNote.prototype.toggle = function(){
		this.html.elements.popup.classList.toggle("popup-add-note__popup_on");
		this.html.elements.mask.classList.toggle("popup-add-note__mask_on");
	};

	return PopupAddNote;

})();