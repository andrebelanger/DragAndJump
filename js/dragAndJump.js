"use strict";

var app = app || {};

app.dragAndJump = {
	// CONSTANT properties
	WIDTH : 640,
	HEIGHT: 480,
	canvas: undefined,
	topCanvas: undefined,
	topCtx: undefined,
	ctx: undefined,
	player: undefined,
	platforms: [],
	drawnPlatforms: [],
	currentLevel: 1,
	gate: undefined,
	dt: 1/60.0, // "delta time"
	origin: undefined,
	hud: undefined,
	drawLib: undefined,
	soundtrack: undefined,
	app:undefined,

	// methods
	init : function(player){
		//console.log("app.dragAndJump.init() called");

		this.canvas = document.querySelector('#mainCanvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		
		this.topCanvas = document.querySelector('#topCanvas');
		this.topCanvas.width = this.WIDTH;
		this.topCanvas.height = this.HEIGHT;
		this.topCtx = this.topCanvas.getContext('2d');
		this.topCtx.globalAlpha = 0.25;
		
		
		// set up player
		this.player = player;
		var image = new Image();
		image.src = this.app.IMAGES['playerImage'];
		this.player.image = image; 
		this.player.init();
		
		this.loadLevel(this.currentLevel);
		
		this.hud.sizeLeft = 400;
		this.hud.draggingSize = 0;
		this.update();
	},
	
	reset : function(player) {
		app.dragPhase = true;
		
		// reset variables
		this.canvas = undefined;
		this.topCanvas = undefined;
		this.topCtx = undefined;
		this.ctx = undefined;
		this.platforms = [];
		this.drawnPlatforms = [];
		this.gate = undefined;
		this.currentLevel = 1,
		this.player.reset();
		
		this.init(player);
	},
	
	loadLevel : function(level) {
		this.platforms = [];
		this.hud.sizeLeft = 400;
		this.hud.draggingSize = 0;
		this.origin = undefined;
		app.jumpPhase = false;
		app.dragPhase = true;
		switch(level) {
			case 1:
				this.platforms.push(new app.Platform(30, 250, 90, 20));
				this.platforms.push(new app.Platform(330, 250, 50, 20));
				this.platforms.push(new app.Platform(600, 250, 90, 20));
				this.player.startingX = 10;
				this.player.startingY = 230;
				this.gate = new app.Gate(600,225);
				break;
			case 2:
				this.platforms.push(new app.Platform(150,430,60,15));
				this.platforms.push(new app.Platform(300,350,60,15));
				this.platforms.push(new app.Platform(450,270,60,15));
				this.platforms.push(new app.Platform(300,190,60,15));
				this.platforms.push(new app.Platform(450,110,60,15));
				this.platforms.push(new app.Platform(600,95,100,15));
				this.gate = new app.Gate(600,75);
				this.player.startingX = 50;
				this.player.startingY = 470;
			break;
			case 3:
				this.platforms.push(new app.Platform(150,460,50,30));
				this.platforms.push(new app.Platform(250,420,50,30));
				this.platforms.push(new app.Platform(520,350,50,30));
				this.platforms.push(new app.Platform(480,250,50,30));
				this.platforms.push(new app.Platform(30,80,100,30));
				this.player.startingX = 50;
				this.player.startingY = 470;
				this.gate = new app.Gate(50,50);
			break;
			case 4:
				app.over = true;
				app.jumpPhase = false;
			break;
		}
				this.player.reset();
				var image = new Image();
				image.src = this.app.IMAGES['gateImage'];
				this.gate.image = image; 
	},

	update : function(){
		// clear screen
		this.ctx.clearRect(0,0,this.WIDTH, this.HEIGHT);
		this.drawLib.backgroundGradient(this.ctx,this.WIDTH,this.HEIGHT);
		
		if(app.title){
			this.drawTitleScreen(this.ctx);
			return;
		}
		
		if(app.over){
			this.drawGameOverScreen(this.ctx);
			return;
		}
		
		if(this.app.keydown[this.app.KEYBOARD.KEY_R]){
			this.loadLevel(this.currentLevel);
		}
		
		if(app.dragPhase) {
			// if enter is pressed, move on to jumpPhase
			if(this.app.keydown[this.app.KEYBOARD.KEY_ENTER]){
				app.dragPhase = false;
				app.jumpPhase = true;
			}
		}
		
		if(app.jumpPhase) {
		// UPDATE
		this.moveSprites();
		
		
		// CHECK FOR COLLISIONS
		this.checkForCollisions();
		
		}

		// DRAW
		this.drawSprites();

		// LOOP
		requestAnimationFrame(this.update.bind(this));
	},
	
	drawSprites: function() {
		this.hud.draw(this.ctx);
		this.player.draw(this.ctx);
		for(var i=0; i < this.platforms.length; i++){
			this.platforms[i].draw(this.ctx);
		};
		this.gate.draw(this.ctx);
		
		this.drawLib.text(this.ctx, this.hud.text, 10, 20, 15, 'white');
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
				createjs.Sound.play("jump", {volume:0.2});
			} 
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
		
		// player v. gate
		if(this.collides(self.player, self.gate)) {
			this.currentLevel++;
			this.loadLevel(this.currentLevel);
		}
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
	},
	
	/* MOUSE AND PLATFORM DRAGGING EVENTS */
	clearTopCanvas: function() {
		this.topCtx.clearRect(0,0,this.topCanvas.width,topCanvas.height);
	},
	
	doMousedown : function(mouse){
		this.origin = {}
		this.origin.x = mouse.x;
		this.origin.y = mouse.y;
	},
	
	doMousemove : function(mouse){

		var x = Math.min(mouse.x,this.origin.x);
		var y = Math.min(mouse.y,this.origin.y);
		var w = Math.abs(mouse.x - this.origin.x);
		var h = Math.abs(mouse.y - this.origin.y);
		
		this.clearTopCanvas();
		this.topCtx.fillStyle="purple";
		this.topCtx.fillRect(x,y,w,h);
		
		this.hud.draggingSize = w;	
	},
	
	doMouseup : function(mouse) {
		this.clearTopCanvas();
		
		var x = Math.min(mouse.x,this.origin.x);
		var y = Math.min(mouse.y,this.origin.y);
		var w = Math.abs(mouse.x - this.origin.x);
		var h = Math.abs(mouse.y - this.origin.y);
		
		if(this.hud.canPlacePlatform)
		{
			var platform = new app.Platform(x+w/2,y+h/2,w,h);
			platform.color = 'purple';
			this.platforms.push(platform);
			
			this.hud.sizeLeft -= platform.width*2;
		}
		this.hud.draggingSize = 0;
	},
	
	doMouseout : function() {
		//console.log("MouseOut");
	},
	
	/* GAME STATE SCREENS */
	drawTitleScreen: function(ctx){
		ctx.save();
		this.drawLib.text(ctx, "Drag and Jump", 130, 150, 50, 'white');
		this.drawLib.text(ctx, "by Andre Belanger", 195, 230, 25, 'white');
		this.drawLib.text(ctx, "Press Space to Start", 200, 300, 20, 'white');
		ctx.restore();
	},
	
	drawGameOverScreen: function(ctx) {
		ctx.save();
		this.drawLib.text(ctx, "Congratulations!", 95, 150, 50, 'white');
		this.drawLib.text(ctx, "You completed all three levels!", 105, 220, 25, 'white');
		this.drawLib.text(ctx, "Press Space to return to the Title Screen", 87, 280, 20, 'white');
		ctx.restore();
	}
	
} // end app.dragAndJump