$(document).ready(function() {

	//Canvas stuff
	var canvas = $("#chooser")[0];
	var ctx = canvas.getContext("2d");
	ctx.canvas.width = $(window).width(); // Resize canvas
	ctx.canvas.height = $(window).height();
	var w = $("#chooser").width();
	var h = $("#chooser").height();
	
	//variables
	var w_inside = w - 2*BLOCK_SIZE;
	var h_inside = h - 2*BLOCK_SIZE;
	
	
	// constants
	var BLOCK_SIZE = 32;
	var ENTRANCE_W = 64;
	var ENTRANCE_H = 96;
	
	function init(){
		
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,w,h);
		
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(think, 60); // I have no idea what I'm doing...
	}
	init();
	function think(){ // Logical operations begin here.
	
		paint();
	}
	
	function paint(){
		// Clear canvas up
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,w,h);
		for (var i=1;i<((h-2*BLOCK_SIZE)/BLOCK_SIZE);i++) // h-a*x, x=block size (eg. 32x32), a=number of blocks to ommit
		{
			ctx.drawImage(wall,0,i*BLOCK_SIZE); // Left vertical wall
			ctx.drawImage(wall,w-BLOCK_SIZE,i*BLOCK_SIZE); // Right vertical wall
		}
		for (var i=1; i<4; i++)
		{
			ctx.drawImage(entrance,((i/4)*w)-(ENTRANCE_W/2),h-2*BLOCK_SIZE-ENTRANCE_H); // Entrances
		}
				for (var i=0;i<w/BLOCK_SIZE;i++)
		{
			ctx.drawImage(wall,i*BLOCK_SIZE,BLOCK_SIZE); // Top horizontal wall
			
			for (var j=1; j<3; j++)
				ctx.drawImage(floor,i*BLOCK_SIZE,h-j*BLOCK_SIZE); // Floor // h-a*x, x=block size (eg. 32x32), a=number of blocks to ommit
			
		}
		
		ctx.drawImage(tiles, 0, 0, BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE, h-3*BLOCK_SIZE, 32,32); // Add additional 
		
	}
	
});