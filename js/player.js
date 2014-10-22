"use strict";

var app = app || {};

app.player = {
	color: "red",
	x: 50,
	y: 470,
	startingX: 50,
	startingY: 470,
	width: 16,
	height: 20,
	speed: 250,
	gravity: 0,
	maxJumpHeight: 70, 
	jumpHeight: 0,
	image: undefined,
	jumping: false,
	isOnSolidGround: true,

	init: function(){
		//console.log("app.player.init() called");
	},

	draw: function(ctx) {
		var halfW = this.width/2;
		var halfH = this.height/2;

		ctx.save();
		if(!this.image){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);
		} else {
			ctx.drawImage(this.image, 0, 0, 174, 185, this.x - halfW, this.y - halfH, this.width, this.height);
		}
		ctx.restore();

	},
	
	reset: function() {
		this.x = this.startingX;
		this.y = this.startingY;
	},
	
	update: function(dt) {
		this.y += this.gravity;
		if(this.y >= 470) {
			this.y = 470;
			this.isOnSolidGround = true;
			this.gravity = 0;
		}
		if(this.x >= 640){
			this.x = 640;
		}
		if(this.x <= 0){
			this.x = 0;
		}
		
		if(this.jumping){
			this.isOnSolidGround = false;
			this.y -= this.speed * dt;
			this.jumpHeight += this.speed * dt;
			
			if(this.jumpHeight >= this.maxJumpHeight) {
				this.jumping = false;
				this.jumpHeight = 0;
			}
		}
		
		if(this.isOnSolidGround) {
			this.gravity = 0;
		}
		else if(!this.jumping){
			this.gravity = 3;
		}
		
	},

	moveLeft: function(dt){
		this.x -= this.speed * dt;
	},
	
	moveRight: function(dt){
		this.x += this.speed * dt;
	}
}; // end app.player