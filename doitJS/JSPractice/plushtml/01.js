'use strict';

function show(name, age){
	alert(`name : ${name}, age : ${age}`);
}

function get(callback){
	let uname = prompt('inputname');
	let uage = parseInt(prompt('inputage'));
	callback(uname, uage);
}

get(show)