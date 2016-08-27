(function(){
	"use strict";

	require("react");
	
	var component = require("./component");
	var message = "Hello from index.js";

	document.body.appendChild(component());
	console.log(message);
}());