"use strict";

var app = app || {};

app.PlayerPlatform = function() {
	function PlayerPlatform(x,y,width,height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.size = width * height;
		this.color = "purple";
	};
	
	var p = PlayerPlatform.prototype;
	
	p.draw = function(ctx){
	
		var halfW = this.width/2;
		var halfH = this.height/2;
		ctx.save();
		
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		ctx.restore();
	};
	
	return Platform;
}();