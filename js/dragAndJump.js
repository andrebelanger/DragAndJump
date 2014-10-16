"use strict";

var app = app || {};

app.dragAndJump = {
	// CONSTANT properties
	WIDTH : 640,
	HEIGHT: 480,
	canvas: undefined,
	ctx: undefined,
	player: undefined,
	platforms: [],
	gate: undefined,
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
		var image = new Image();
		image.src = this.app.IMAGES['playerImage'];
		this.player.image = image; 
		this.player.init();
		
		
		// set up platform
		//this.platform = platform;
		//this.platform.init(380,460,50,60);
		
		this.platforms.push(new app.Platform(380,460,50,60));
		this.platforms.push(new app.Platform(470,420,50,30));

		// set up gate
		this.gate = new app.Gate(100,100);

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
		//this.platform.draw(this.ctx);
		for(var i=0; i < this.platforms.length; i++){
			this.platforms[i].draw(this.ctx);
		};
		this.gate.draw(this.ctx);

		// LOOP
		requestAnimationFrame(this.update.bind(this));
	},

	moveSprites: function(){

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
			} 
		} else {
			//this.player.jumping = false;
		}
		this.player.update(this.dt);
	},
	
	checkForCollisions : function(){
		var self = this;
		
		// player v. platform
		this.platforms.forEach(function(platform) {
			if(self.collides(self.player, platform)){
				if(self.player.y < platform.y)
				{
					// landed on top of platform
					//console.log("Platform landed on!");
					self.player.y = platform.y-platform.height/2-self.player.height/2;
					self.player.isOnSolidGround = true;
					self.player.jumping = false;
					return;
				}
				else
				{	
					//console.log("platform bottom hit");
				}
				
				if(self.player.x > platform.x)
				{
					self.player.x = platform.x+platform.width/2+self.player.width/2;
				} 
				else {
					self.player.x = platform.x-platform.width/2-self.player.width/2;
				}
			}
			else{
				self.player.isOnSolidGound = false
				if(!self.player.jumping)
					self.player.gravity = 3;
				else
					self.player.gravity = 0;
			}
		});
	},
	
	collides: function (a, b) {
		var ax = a.x - a.width/2;
		var ay = a.y - a.height/2;
		var bx = b.x - b.width/2;
		var by = b.y - b.height/2;
		
		return  ax <= bx + b.width &&
				ax + a.width >= bx &&
			   ay <= by + b.height &&
				ay + a.height >= by;
	}
} // end app.dragAndJump