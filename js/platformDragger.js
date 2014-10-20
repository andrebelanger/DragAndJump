"use strict";

var app = app || {};

app.platformDragger = {
	
	doMousedown : function(e){
		var mouse = {}
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		console.log("X: " + mouse.x + " Y: " + mouse.y);
	},
	
	doMousemove : function(e){
		console.log("MouseMove");
	},
	
	doMouseup : function(e) {
		console.log("MouseUp");
	},
	
	doMouseout : function(e) {
		console.log("MouseOut");
	}

};