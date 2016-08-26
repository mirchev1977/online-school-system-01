(function(){
	"use strict";

	module.exports = function () {
	  var element = document.createElement('h1');

	  element.className = 'pure-button';
	  element.innerHTML = 'Hello world!!! This is a nice option! Ha ha!';

	  return element;
	};
}());