"use strict";

var app = app || {};

app.hud = {
	sizeLeft: undefined,
	draggingSize: undefined,
	canPlacePlatform: true,
	
	draw : function(ctx, dragPhase) {
		ctx.save();
		
		if(app.dragPhase) 
		{
			// Draw size of drawing platforms left available
			if(this.draggingSize/20 > this.sizeLeft)
			{
				this.canPlacePlatform = false;
				ctx.fillStyle = "rgba(255,0,0, .25)";
				ctx.fillRect(225, 20, this.sizeLeft, 25);
			} else {
				this.canPlacePlatform = true;
				ctx.fillStyle = "rgba(30,144,255, .25)";
				ctx.fillRect(225, 20, this.sizeLeft, 25);
				
				ctx.fillStyle = "rgba(30,144,255, .25)";
				ctx.fillRect(225, 20, this.sizeLeft - this.draggingSize/20, 25);
			}
			ctx.restore();
		} else {
			
		}
		
	}
};