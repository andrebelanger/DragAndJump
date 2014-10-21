// drawLib.js
"use strict";
var app = app || {};

app.drawLib = {
	clear : function(ctx, x, y, w, h) {
		ctx.clearRect(x, y, w, h);
	},
	
	rect : function(ctx, x, y, w, h, col) {
		ctx.save();
		ctx.fillStyle = col;
		ctx.fillRect(x, y, w, h);
		ctx.restore();
	},
	
	backgroundGradient: function(ctx, width, height){
		ctx.save();
		// Create gradient - top to bottom
		var grad = ctx.createLinearGradient(0,0,0,height);
		grad.addColorStop(0,"#00CCFF"); // top
		grad.addColorStop(0.33,"#9900CC"); // 33% down
		grad.addColorStop(0.50,"#FF4D4D"); // 50% down
		grad.addColorStop(0.85,"#FF9900"); // 85% down
		grad.addColorStop(1,"#009933"); // bottom
		
		// change this to fill entire ctx with gradient
		ctx.fillStyle = grad;
		ctx.fillRect(0,0,width,height);
		ctx.restore();
	},
	
	text : function(ctx, string, x, y, size, col) {
		ctx.save();
		ctx.font = 'bold ' + size + 'px Monospace';
		ctx.fillStyle = col;
		ctx.fillText(string, x, y);
		ctx.restore();
	}
};