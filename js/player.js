"use strict";

var app = app || {};

app.player = {
	color: "red",
	x: 320,
	y: 470,
	width: 16,
	height: 20,
	speed: 250,
	jumpHeight: 40,
	image: undefined,

	init: function(){
		console.log("app.player.init() called");
	},

	draw: function(ctx) {
		var halfW = this.width/2;
		var halfH = this.height/2;

		ctx.save();
		if(!this.image){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);
		}
		ctx.restore();

	},

	moveLeft: function(dt){
		this.x -= this.speed * dt;
	},
	
	moveRight: function(dt){
		this.x += this.speed * dt;
	},
	
	jump: function(dt){
		this.y -= this.jumpHeight;
	}
}; // end app.player