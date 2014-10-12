"use strict";

var app = app || {};

app.dragAndJump = {
	//CONSTANT properties
	WIDTH : 640,
	HEIGHT: 480,
	canvas: undefined,
	ctx: undefined,
	player: undefined,

	// methods
	init : function(player){
		console.log("app.dragAndJump.init() called");

		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');

		// set up player
		this.player = player;
		this.player.init();

		this.update();
	},

	update : function(){
		// clear screen
		this.ctx.clearRect(0,0,this.WIDTH, this.HEIGHT);

		// UPDATE
		this.player.draw(this.ctx);

		this.ctx.fillStyle = "gray";
		this.ctx.fillRect(0,0,this.WIDTH, this.HEIGHT);

		this.player.draw(this.ctx);

		// LOOP
		requestAnimationFrame(function(){this.update});
	}
	
} // end app.dragAndJump