"use strict";

var app = app || {};

window.onload = function(){
	console.log("window.onload called");
	app.dragAndJump.init(app.player);
}