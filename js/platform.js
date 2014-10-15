"use strict";

var app = app || {};

app.Platform = function(){

	
	function Platform(x,y,width,height){
		console.log(width + "x" + height + " platform created at " + x + "," + y);
		
		// set size and starting position of platform
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = "black";
	};
	
	var p = Platform.prototype;
	
	p.draw = function(ctx){
	
		var halfW = this.width/2;
		var halfH = this.height/2;
		ctx.save();
		
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);
		
		ctx.restore();
	};
	
	return Platform;
}();