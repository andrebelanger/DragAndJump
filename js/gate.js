"use strict";

var app = app || {};

app.Gate = function(){

	function Gate(x,y){
		this.x = x;
		this.y = y;
		this.width = 50;
		this.height = 50;
		this.color = "red";
	};

	var p = Gate.prototype;
	
	p.draw = function(ctx)
	{
		var halfW = this.width/2;
		var halfH = this.height/2;
		ctx.save();
		
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);
		
		ctx.restore();
	}

	return Gate;
}();