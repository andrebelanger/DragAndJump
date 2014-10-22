"use strict";

var app = app || {};

//CONSTANTS
app.KEYBOARD = {
	"KEY_LEFT": 37,
	"KEY_UP": 38,
	"KEY_RIGHT": 39,
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_ENTER": 13
};

app.IMAGES = {
	playerImage:"images/player.png",
	gateImage:"images/gate.png"
};

app.mouseDown = false;

// GameState Properties
app.paused = false;
app.title = true;
app.dragPhase = false;
app.jumpPhase = false;
app.over = false;


app.keydown = []; 

window.onload = function(){
	console.log("window.onload called");
	app.dragAndJump.app = app;
	app.dragAndJump.hud = app.hud;
	app.dragAndJump.drawLib = app.drawLib;
	
	app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	app.queue.on("complete", function(){
		console.log("images loaded called");
		app.dragAndJump.init(app.player);
	});
	
	app.queue.loadManifest([
		{id: "playerImage", src:"images/player.png"},
		{id: "gateImage", src:"images/gate.png"},
		{id: "jump", src:"sounds/jump.wav"},
		// "A Walk Through The City" by Eric Matyas found at http://opengameart.org/content/a-walk-through-the-city
		{id: "soundtrack", src:"sounds/soundtrack.mp3"},
	]);

	 
	// key press event listeners
	window.addEventListener("keydown", function(e){
		app.keydown[e.keyCode] = true;
		if(e.keyCode == 13) {
			if(app.over)
			{
				app.title = true;
				app.over = false;
				app.dragAndJump.update();
			} else if(app.title)
			{
				app.title = false;
				app.dragPhase = true;
				app.dragAndJump.reset(app.player);
			}
		}
	});
	window.addEventListener("keyup", function(e){
		app.keydown[e.keyCode] = false;
	});
	
	window.addEventListener("mousedown" , function(e){
			var mouse = {}
			mouse.x = e.pageX - e.target.offsetLeft;
			mouse.y = e.pageY - e.target.offsetTop;
			app.mouseDown = true;
			app.dragAndJump.doMousedown(mouse);
	});
	
	window.addEventListener("mousemove" , function(e){
		if(app.dragPhase) {
			var mouse = {}
			mouse.x = e.pageX - e.target.offsetLeft;
			mouse.y = e.pageY - e.target.offsetTop;
			if(app.mouseDown){
				app.dragAndJump.doMousemove(mouse)
			}
		}
	});
	
	window.addEventListener("mouseup" , function(e){
		if(app.dragPhase) {
			var mouse = {}
			mouse.x = e.pageX - e.target.offsetLeft;
			mouse.y = e.pageY - e.target.offsetTop;
			app.mouseDown = false;
			app.dragAndJump.doMouseup(mouse)
		}
	});
}