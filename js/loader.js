"use strict";

var app = app || {};

//CONSTANTS
app.KEYBOARD = {
	"KEY_LEFT": 37,
	"KEY_UP": 38,
	"KEY_RIGHT": 39,
	"KEY_DOWN": 40,
	"KEY_SPACE": 32
};

app.keydown = []; 

window.onload = function(){
	console.log("window.onload called");
	app.dragAndJump.app = app;
	app.dragAndJump.init(app.player, app.platform);

	// key press event listeners
	window.addEventListener("keydown", function(e){
		app.keydown[e.keyCode] = true;
	});
	window.addEventListener("keyup", function(e){
		app.keydown[e.keyCode] = false;
	});
}