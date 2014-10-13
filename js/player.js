"use strict";

var app = app || {};

app.player = {
	color: "red",
	x: 320,
	y: 470,
	width: 16,
	height: 20,
	speed: 250,
	maxJumpHeight: 70, 
	jumpHeight: 0,
	image: undefined,
	jumping: false,
	isOnSolidGround: true,

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
	
	update: function(dt) {
		if(this.y >= 470) {
			this.y = 470;
			this.isOnSolidGround = true;
		}
		
		if(this.jumping){
			this.isOnSolidGround = false;
			this.y -= this.speed * dt;
			this.jumpHeight += this.speed * dt;
			
			if(this.jumpHeight >= this.maxJumpHeight) {
				this.jumping = false;
				this.jumpHeight = 0;
			}
		} else if(!this.isOnSolidGround){
			this.y += 2;
		}
	},

	moveLeft: function(dt){
		this.x -= this.speed * dt;
	},
	
	moveRight: function(dt){
		this.x += this.speed * dt;
	}
}; // end app.player