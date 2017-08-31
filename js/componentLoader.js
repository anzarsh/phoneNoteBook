(function(){
	
	var ComponentLoader = function(){
		this.components = {};
	};

	ComponentLoader.prototype._loadHTML = function(xhr, path){
		var self = this;
		xhr.open("GET", path + "/" + xhr.name + ".html", true);
		xhr.responseType = "document";
		xhr.overrideMimeType("text/html; charset=utf-8");
		xhr.onreadystatechange = function(e){
			if(this.readyState != 4) return;
			if(this.status == 404){
				self._count--;
				self._params.warning(this.name + " : " + this.status + " (" + this.statusText + ")");
			} else if(this.status != 200){
				self._params.error(this.name + " : " + this.status + " (" + this.statusText + ")");
			} else {
				self.components[this.name] = self.components[this.name] || {};
				self.components[this.name].html = this.responseXML.body.firstChild;

				self._count--;
				if(!self._count){
					self._params.success();
				}
			}
		};
		xhr.send(null);
	};

	ComponentLoader.prototype._loadCSS = function(xhr, path){
		var self = this;
		xhr.open("GET", path + "/" + xhr.name + ".css", true);
		xhr.overrideMimeType("text/plain; charset=utf-8");
		xhr.onreadystatechange = function(e){
			if(this.readyState != 4) return;
			if(this.status == 404){
				self._count--;
				self._params.warning(this.name + " : " + this.status + " (" + this.statusText + ")");
			} else if(this.status != 200){
				self._params.error(this.name + " : " + this.status + " (" + this.statusText + ")");
			} else {
				self.components[this.name] = self.components[this.name] || {};
				self.components[this.name].css = this.responseText;
				self._count--;
				if(!self._count){
					self._params.success();
				}
			}
		};
		xhr.send(null);
	};

	ComponentLoader.prototype._loadJS = function(xhr, path){
		var self = this;
		xhr.open("GET", path + "/" + xhr.name + ".js", true);
		xhr.overrideMimeType("text/plain; charset=utf-8");
		xhr.onreadystatechange = function(e){
			if(this.readyState != 4) return;
			if(this.status == 404){
				self._count--;
				self._params.warning(this.name + " : " + this.status + " (" + this.statusText + ")");
			} else if(this.status != 200){
				self._params.error(this.name + " : " + this.status + " (" + this.statusText + ")");
			} else {
				self.components[this.name] = self.components[this.name] || {};
				self.components[this.name].constructor = eval(this.responseText);
				self._count--;
				if(!self._count){
					self._params.success();
				}
			}
		};
		xhr.send(null);
	};

	ComponentLoader.prototype.load = function(params){
		params.processing();
		var self = this;
		var postfix = ["html", "css", "js"];
		var components = params.components;
		this._count = Object.keys(components).length * postfix.length;
		this._params = params;
		var xhr = {};
		for (var comp in components){
		
			for (var i=0; i<postfix.length; i++){

				var name = comp + postfix[i];
				xhr[name] = new XMLHttpRequest();
				xhr[name].name = comp;
				xhr[name].fullName = comp + "." + postfix[i];
				if(postfix[i] == "html"){
					self._loadHTML(xhr[name], components[comp]);
				} else if(postfix[i] == "css") {
					self._loadCSS(xhr[name], components[comp]);
				} else if(postfix[i] == "js") {
					self._loadJS(xhr[name], components[comp]);
				}

			} // end for postfix

		} // end for components

	};

	ComponentLoader.prototype.insertIn = function(elem){
		var styles = "";
		
		var components = this.components;
		for(var comp in components){
			styles += components[comp].css;
		}
		var style = document.createElement("style");
		style.textContent = styles;
		document.head.appendChild(style);

		var outerComponents = elem.querySelectorAll("[component]");

		for (var i=0; i<outerComponents.length; i++){
			var compName = outerComponents[i].getAttribute("component");
			outerComponents[i].appendChild(components[compName].html);
		}
	};

	window.note = window.note || {};
	window.note.ComponentLoader = ComponentLoader;

})();