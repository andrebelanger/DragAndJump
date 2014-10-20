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

app.IMAGES = {
	playerImage:"images/player.png",
	gateImage:"images/gate.png"
};

app.keydown = []; 

window.onload = function(){
	console.log("window.onload called");
	app.dragAndJump.app = app;
	
	app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	app.queue.on("complete", function(){
		console.log("images loaded called");
		app.dragAndJump.init(app.player);
	});
	
	app.queue.loadManifest([
		{id: "playerImage", src:"images/player.png"},
		{id: "gateImage", src:"images/gate.png"}
	]);

	// key press event listeners
	window.addEventListener("keydown", function(e){
		app.keydown[e.keyCode] = true;
	});
	window.addEventListener("keyup", function(e){
		app.keydown[e.keyCode] = false;
	});
}