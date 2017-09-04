(function(){
	
	var ComponentLoader = function(){
		this.components = {};
		this.customEventIE();
	};

	/*files loaders*/

	ComponentLoader.prototype._loadHTML = function(xhr, path){
		var self = this;
		xhr.open("GET", path + "/" + xhr.name + ".html", true);
		// xhr.responseType = "document";
		xhr.overrideMimeType("text/plain; charset=utf-8");
		xhr.onreadystatechange = function(e){
			if(this.readyState != 4) return;
			if(this.status == 404){
				self._count--;
				self._params.warning(path + "/" + self.name + ".html" + " : " + this.status + " (" + this.statusText + ")");
			} else if(this.status != 200){
				self._params.error(path + "/" + self.name + ".html" + " : " + this.status + " (" + this.statusText + ")");
			} else {

				self.components[this.name] = self.components[this.name] || {};
				var documentFragment = document.createElement("body");
				documentFragment.innerHTML = this.responseText;
				var component = documentFragment.querySelector("."+this.name);

				if(component){
				
					self.components[this.name].html = component;
				
				} else {
				
					documentFragment = document.createElement("table");
					documentFragment.innerHTML = this.responseText;
					var component = documentFragment.querySelector("."+this.name);
				
					if(component){
				
						self.components[this.name].html = component;
				
					}
				
				}

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
				self._params.warning(path + "/" + self.name + ".css" + " : " + this.status + " (" + this.statusText + ")");
			} else if(this.status != 200){
				self._params.error(path + "/" + self.name + ".css" + " : " + this.status + " (" + this.statusText + ")");
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
				self._params.warning(path + "/" + self.name + ".js" + " : " + this.status + " (" + this.statusText + ")");
			} else if(this.status != 200){
				self._params.error(path + "/" + self.name + ".js" + " : " + this.status + " (" + this.statusText + ")");
			} else {
				self.components[this.name] = self.components[this.name] || {};
				self.components[this.name].constructor = eval(this.responseText);
				self.components[this.name].constructor.prototype.emit = self.emit;
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

	/*files loaders*/

	/*method of insert styles and html*/

	ComponentLoader.prototype.insertStyles = function(){
		
		var styles = "";
		
		var components = this.components;
		for(var comp in components){
			if(components[comp].css)
				styles += components[comp].css;
		}
		var style = document.createElement("style");
		style.textContent = styles;
		document.head.appendChild(style);

	};

	ComponentLoader.prototype.insertHTML = function(elem){

		var components = this.components;

		var outerComponents = elem.querySelectorAll("[component]");

		elem.comNodes = [];

		elem.comNode = {};

		for (var i=0; i<outerComponents.length; i++){

			var compName = outerComponents[i].getAttribute("component");
			outerComponents[i].appendChild(components[compName].html.cloneNode(true));
			elem.comNode[compName] = outerComponents[i].lastChild;
			elem.comNodes.push(outerComponents[i].lastChild);
			this.insertHTML(outerComponents[i].lastChild);
		}

	};

	ComponentLoader.prototype.insertIn = function(elem){
		
		this.insertStyles();

		this.COM = elem; // component object model

		this.insertHTML(this.COM);
		
	};

	/*method of insert styles and html*/



	/*adds custom events for ie9-11*/

	ComponentLoader.prototype.customEventIE = function(){
		try {
			new CustomEvent("IE has CustomEvent, but doesn't support constructor");
		} catch (e) {
			window.CustomEvent = function(event, params) {
			var evt;
			params = params || {
				bubbles: false,
				cancelable: false,
				detail: undefined
			};
			evt = document.createEvent("CustomEvent");
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
			};
			CustomEvent.prototype = Object.create(window.Event.prototype);
		}
	};

	ComponentLoader.prototype.emit = function(eventName, data){
	  return this.dispatchEvent(new CustomEvent(eventName, {
	  	bubbles: true,
	  	cancelable: true,
	  	detail: data
	  }));
	};

	/*adds custom events for ie9-11*/

	window.note = window.note || {};
	window.note.ComponentLoader = ComponentLoader;

})();