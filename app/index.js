(function(){
	"use strict";

	require('./main.css');
	require('react');
	
	var component = require('./component');

	document.body.appendChild(component());
	console.log('Hello from index.js');
}());