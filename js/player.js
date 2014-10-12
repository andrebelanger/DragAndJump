"use strict";

var app = app || {};

app.player = {
	color: "red",
	x: 320,
	y: 420,
	width: 34,
	height: 42,
	speed: 250,
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

	}
}; // end app.player