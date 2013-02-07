$(document).ready(function() {

	// Canvas stuff
	var canvas = $("#chooser")[0];
	var ctx = canvas.getContext("2d");
	ctx.canvas.width = $(window).width(); // Resize canvas
	ctx.canvas.height = $(window).height();
	var w = $("#chooser").width();
	var h = $("#chooser").height();

	// constants
	var BLOCK_SIZE = 32;
	var ENTRANCE_W = 64;
	var ENTRANCE_H = 96;

	// variables
	var w_inside = w - 2*BLOCK_SIZE;
	var h_inside = h - 2*BLOCK_SIZE;

	// Mario's data
	var mario = {
		// vars
		x: BLOCK_SIZE,
		y: h-3*BLOCK_SIZE,
		move_dir: -1, // -1=left, 1=right
		walking: false, // walking = user is holding left or right key
		blendMove: false,
		jumping: false,
		mspeed: {
			x: 0,
			y: 0
		},
		// functions
		process: function(){
			// do the controls
			if ( key_pressed[37] || key_pressed[39] ) { // if pressed left key or right key
				if (! mario.jumping) { // check if mario is jumping/falling
					mario.walking = true; // move mario
					if ((key_pressed[37] && key_pressed[39])) {
						return; // if pressing both keys, stahp
					}
					mario.move_dir = key_pressed[37] ? 0 : 1; // choose direction
				}
			}else{
				mario.walking = false; // stop mario
			}

			// process mario's moves
				if (mario.mspeed.x < 0) { mario.mspeed.x=0; return; } 
				if (mario.mspeed.x <= 4 && mario.walking) mario.mspeed.x += 0.4; // If player's pressing the key and Mario's speed is low, accelerate
				if (!mario.walking && mario.mspeed.x > 0) mario.mspeed.x -= 0.4; // If player's not pressing the key and Mario is moving, decelerate
				var i = !mario.move_dir ? -mario.mspeed.x : mario.mspeed.x ; // choose where to go (left or right) |  !mario.move_dir  <=>  mario.move_dir == 0
				if( (mario.x + i >= BLOCK_SIZE) && (mario.x + i <= w-2*BLOCK_SIZE) ) // check if moved mario will not interfere with walls
					mario.x += i; // Everything okay -> move mario on screen
		}
	};

	function init(){
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,w,h);

		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(process, 30); // I have no idea what I'm doing...
	}

	function process(){ // Logical operations begin here.
		// Process Mario
		mario.process();

		// Do the drawing
		paint();
	}

	function paint(){
		// Clear canvas up
		ctx.fillStyle="#000000";
		ctx.fillRect(0,0,w,h);

		// 1. Background
		for (var i=1;i<((h-2*BLOCK_SIZE)/BLOCK_SIZE);i++){ // h-a*x, x=block size (eg. 32x32), a=number of blocks to ommit
			ctx.drawImage(wall,0,i*BLOCK_SIZE); // Left vertical wall
			ctx.drawImage(wall,w-BLOCK_SIZE,i*BLOCK_SIZE); // Right vertical wall
		}

		for (var i=1; i<4; i++){
			ctx.drawImage(entrance,((i/4)*w)-(ENTRANCE_W/2),h-2*BLOCK_SIZE-ENTRANCE_H); // Entrances
		}

		for (var i=0;i<w/BLOCK_SIZE;i++){
			ctx.drawImage(wall,i*BLOCK_SIZE,BLOCK_SIZE); // Top horizontal wall

			for (var j=1; j<3; j++)
				ctx.drawImage(floor,i*BLOCK_SIZE,h-j*BLOCK_SIZE); // Floor // h-a*x, x=block size (eg. 32x32), a=number of blocks to ommit
		}

		// 2. TXT & other
		

		// 3. Mario
		ctx.drawImage(tiles, 0, 0, BLOCK_SIZE, BLOCK_SIZE, mario.x, mario.y, 32,32); // Drawing Mario
	}

	// Controls
	var key_pressed = {};
	window.addEventListener('keydown', function (evt) { key_pressed[evt.keyCode]=true; }, true);
	window.addEventListener('keyup', function (evt) { key_pressed[evt.keyCode]=false; }, true);

	// Now run
	init();
});
