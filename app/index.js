(function(){
	"use strict";

	require("react");
	
	var component = require("./component");
	var ecmaComponent = require("./ecmaComponent");
	var message = "Hello from index.js";

	document.body.appendChild(component());
	document.body.appendChild(ecmaComponent());
	console.log(message);
}());