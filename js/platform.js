"use strict";

var app = app || {};

app.platform = {
	color: "black",
	x: undefined,
	y: undefined,
	width: undefined,
	height: undefined,
	
	init: function (x,y,width,height){
		console.log(width + "x" + height + " platform created at " + x + "," + y);
		
		// set size and starting position of platform
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	},
	
	draw: function(ctx){
		ctx.save();
		
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		ctx.restore();
	}
	
}