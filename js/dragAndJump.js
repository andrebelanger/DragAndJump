"use strict";

var app = app || {};

app.dragAndJump = {
	// CONSTANT properties
	WIDTH : 640,
	HEIGHT: 480,
	canvas: undefined,
	ctx: undefined,
	player: undefined,
	platform: undefined, // FOR NOW: one platform
	dt: 1/60.0, // "delta time"
	app:undefined,

	// methods
	init : function(player, platform){
		console.log("app.dragAndJump.init() called");

		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');

		// set up player
		this.player = player;
		this.player.init();
		
		
		// set up platform
		this.platform = platform;
		this.platform.init(350,430,50,20);
		this.update();
	},

	update : function(){
		// clear screen
		this.ctx.clearRect(0,0,this.WIDTH, this.HEIGHT);

		// UPDATE
		this.moveSprites();

		this.ctx.fillStyle = "gray";
		this.ctx.fillRect(0,0,this.WIDTH, this.HEIGHT);
		
		// CHECK FOR COLLISIONS
		this.checkForCollisions();

		// DRAW
		this.player.draw(this.ctx);
		this.platform.draw(this.ctx);

		// LOOP
		requestAnimationFrame(this.update.bind(this));
	},

	moveSprites: function(){
		this.player.update(this.dt);
		// Ask "Key Daemon" which keys are down
		if(this.app.keydown[this.app.KEYBOARD.KEY_LEFT]){
			this.player.moveLeft(this.dt);
		}

		if(this.app.keydown[this.app.KEYBOARD.KEY_RIGHT]){
			this.player.moveRight(this.dt);
		}

		if(this.app.keydown[this.app.KEYBOARD.KEY_SPACE]){
			if(this.player.isOnSolidGround){
				this.player.jumping = true;
				this.player.isOnSolidGround = false;
				this.spaceReleased = false;
			} 
		} else {
			this.player.jumping = false;
		}
	},
	
	checkForCollisions : function(){
		var self = this;
		
		// player v. platform
		if(self.collides(this.player, this.platform)){
			console.log("Collision detected!");
		}
	},
	
	collides: function (a, b) {
		var ax = a.x - a.width/2;
		var ay = a.y - a.height/2;
		var bx = b.x - b.width/2;
		var by = b.y - b.height/2;
		
		return  ax < bx + b.width &&
				ax + a.width > bx &&
			   ay < by + b.height &&
				ay + a.height > by;
	}
} // end app.dragAndJump