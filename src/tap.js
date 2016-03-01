(function(window, document, undefined){

	var tap = (function(elm, options){

		this.defaults = {};

		this.init = function(elm, options){

			if ( !elm ) 
				return this;
			

			if((elm.nodeType) && this.isCompatible()){

				this.settings = (options) ? this.applyOptions(this.defaults, options) : defaults;
				this.elm = elm;
				this.replaceElement();
				
				return this;

			}

			if(window === this)
				return new tap(elm, options);

		};

		this.applyOptions = function(defaults, options) {

			for (var p in options) {
				try {
					if (options[p].constructor === Object)
						defaults[p] = applyOptions(defaults[p], options[p]);
					else
						defaults[p] = options[p];
				} catch (e) {
					defaults[p] = options[p];
				}
			}

			return defaults;

		};

		this.replaceElement = function(){

			var tA = document.createElement('div'), attr = this.elm.attributes;

			for(var i=0; i<attr.length; i++)
				tA.setAttribute(attr[i].nodeName, attr[i].nodeValue);
			
			tA.setAttribute('contentEditable', true);
			this.elm.parentNode.replaceChild(tA, this.elm);
			this.elm = tA;
			this.attachEvents();

		};

		this.attachEvents = function(){

			for(var key in this.events){
				if (this.attachEvent)
					this.elm.attachEvent('on'+key, this.events[key].bind(this));
				else
					this.elm.addEventListener(key, this.events[key].bind(this), false);
			}

		};

		this.isCompatible = function(){
			if(document.createElement('div').contentEditable !== null)
				return true;
			else
				return false;			
		};

		this.applyFormatting = function(text){

			var patterns = this.settings.patterns;

			for(var i=0; i < patterns.length; i++){

				var re = new RegExp(patterns[i].regex[0], (patterns[i].regex[1]) ? patterns[i].regex[1] : ''),

				text = text.replace(re, function(match){
					tempCon = document.createElement('div'),
					tempElm = document.createElement(patterns[i].element);

					for(attr in patterns[i].attributes)
						tempElm.setAttribute(attr, patterns[i].attributes[attr]);

					tempCon.appendChild(tempElm);
					tempElm.innerHTML = match;

					return tempCon.innerHTML;

				});
			}

			return text;

		};

		this.getSelectedText = function () {

			if (window.getSelection){
				return window.getSelection();
			} else if (document.getSelection){
				return document.getSelection();
			} else if (document.selection){
				return document.selection.createRange().text;
			}else{
				return false;
			}

		};

		this.caretPosition = {
			saveSelection: function(containerEl) {

				if(window.getSelection && document.createRange){

					var range = window.getSelection().getRangeAt(0);
					var preSelectionRange = range.cloneRange();

					preSelectionRange.selectNodeContents(containerEl);
					preSelectionRange.setEnd(range.startContainer, range.startOffset);

					var start = preSelectionRange.toString().length;

					return {
						start: start,
						end: start + range.toString().length
					};

				}else if(document.selection){

					var selectedTextRange = document.selection.createRange();
					var preSelectionTextRange = document.body.createTextRange();

					preSelectionTextRange.moveToElementText(containerEl);
					preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);

					var start = preSelectionTextRange.text.length;

					return {
						start: start,
						end: start + selectedTextRange.text.length
					}

				}
			},

			restoreSelection: function(containerEl, savedSel) {

				if(window.getSelection && document.createRange){

					var charIndex = 0, range = document.createRange();

					range.setStart(containerEl, 0);
					range.collapse(true);

					var nodeStack = [containerEl], node, foundStart = false, stop = false;

					while (!stop && (node = nodeStack.pop())) {
						if (node.nodeType == 3) {
							var nextCharIndex = charIndex + node.length;
							if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
								range.setStart(node, savedSel.start - charIndex);
								foundStart = true;
							}
							if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
								range.setEnd(node, savedSel.end - charIndex);
								stop = true;
							}
							charIndex = nextCharIndex;
						} else {
							var i = node.childNodes.length;
							while (i--) {
								nodeStack.push(node.childNodes[i]);
							}
						}
					}

					var sel = window.getSelection();

					sel.removeAllRanges();
					sel.addRange(range);

				} else if (document.selection){

					var textRange = document.body.createTextRange();

					textRange.moveToElementText(containerEl);
					textRange.collapse(true);
					textRange.moveEnd("character", savedSel.end);
					textRange.moveStart("character", savedSel.start);
					textRange.select();

				}
			}
		};

		this.events = {

			keyup: function(e){

				if(this.elm.textContent != this.getSelectedText()){

					var pos = this.caretPosition.saveSelection(this.elm);

					this.elm.innerHTML = this.applyFormatting(this.elm.textContent);

					this.caretPosition.restoreSelection(this.elm, pos);

				}
			}

		};

		return this.init(elm, options);

	});

tap.prototype = {
	textLength: function(){
		return this.elm.textContent.length;
	},
	clear: function(){
		this.elm.innerHTML = '';
		return this;
	},
	innerText: function(){
		return this.elm.textContent;
	},
	innerHTML: function(){
		return this.elm.innerHTML;
	},
	element: function(){
		return this.elm;
	}
}

window.tap = tap;

})(window, document);