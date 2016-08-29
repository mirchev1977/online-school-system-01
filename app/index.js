(function(){
	"use strict";

	require("react");
	
	var component = require("./component");
	var ecmaComponent = require("./ecmaComponent");
	var message = "Hello from index.js";
	var webpackSrc = require("./images/webpack-img.png");
	var natureSrc = require("./images/nature.jpg");
	var webpackElement = document.createElement("img");
	var natureElement = document.createElement("img");
	webpackElement.src = webpackSrc;
	natureElement.src = natureSrc;

	document.body.appendChild(component());
	document.body.appendChild(ecmaComponent());
	document.body.appendChild(webpackElement);
	document.body.appendChild(natureElement);
	console.log(message);
}());