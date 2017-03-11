var LINE_WIDTH = 2;
var ID = 0;
var colors = ['white', 'red', 'green', 'blue', 'yellow', 'cyan'];

function RAINBOW() {
	return "rgb(" + red + ", " + green + ", " + blue + ")";

}

function Node(game, type, speed, radius) {
	this.type = type;
	this.color = type;
	this.radius = radius
    this.speed = speed;
    this.game = game;
    this.ctx = game.ctx;
    this.x = Math.random() * (game.surfaceWidth - 50 - (2 * (this.radius + 10))) + this.radius + 10;
    this.y = Math.random() * (game.surfaceHeight - (2 * (this.radius + 10))) + this.radius + 10;
	this.ID = ID;
	ID++;
	
	// Movement
	this.direction = Math.random() * (Math.PI * 2);
	
	// Collision
	this.isColliding = false;
	
	// Destruction flag. Set to true to mark this entity for removal.
	this.destroy = false;
	
	// Behavior-specific Variables
	this.seek_distance = 9001;
	this.seek_other_x = "undefined";
	this.seek_other_y = "undefined";
	this.original_speed = "undefined";
	this.has_split = "undefined";
	
}

Node.prototype.draw = function () {
    this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	if	(this.type === "RAINBOW") {
		this.ctx.fillStyle = "rgb(" + this.game.red + ", " + this.game.green + ", " + this.game.blue + ")";
	} else {
		this.ctx.fillStyle = this.color;
	}
	this.ctx.fill();
	this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.strokeStyle = '#000000';
    this.ctx.stroke();
    this.ctx.closePath();
}

Node.prototype.update = function () {
	wallBounce(this);
	
	// *_before Functions
	switch(this.type) {
		case 'white':
			// Nothing
			break;
		case 'red':
			behavior_eat_before(this);
			break;
		case 'green':
			behavior_speedboost_before(this);
			break;
		case 'blue':
			// Nothing
			break;
		case 'yellow':
			behavior_split_before(this);
			break;
		case 'cyan':
			// Nothing
			break;
		case 'RAINBOW':
			// Nothing
			break;
		default:
			// Nothing
			break;
	}
	
	// *_loop Functions
	for	(var i = 0; i < this.game.entities.length; i++) {
		var other = this.game.entities[i];
		if	(this.ID !== other.ID) {
			var other = this.game.entities[i];
			
			switch(this.type) {
					case 'white':
						behavior_bounce_loop(this, other);
						break;
					case 'red':
						behavior_eat_loop(this, other);
						break;
					case 'green':
						behavior_bounce_loop(this, other);
						behavior_speedboost_loop(this, other);
						break;
					case 'blue':
						behavior_inert_loop(this, other);
						break;
					case 'yellow':
						behavior_split_loop(this, other);
						break;
					case 'cyan':
						behavior_bounce_loop(this, other);
						behavior_mirror_loop(this, other);
						break;
					case 'RAINBOW':
						behavior_RAINBOW_loop(this, other);
						break;
					default:
						// Nothing
						break;
				}
			
		}
			
	}
	
	// *_after Functions
	switch(this.type) {
		case 'white':
			// Nothing
			break;
		case 'red':
			behavior_eat_after(this);
			break;
		case 'green':
			behavior_speedboost_after(this);
			break;
		case 'blue':
			behavior_inert_after(this);
			break;
		case 'yellow':
			// Nothing
			break;
		case 'cyan':
			// Nothing
			break;
		case 'RAINBOW':
			// Nothing
			break;
		default:
			// Nothing
			break;
	}
	
    this.x += this.game.clockTick * this.speed * Math.cos(this.direction);
    this.y -= this.game.clockTick * this.speed * Math.sin(this.direction);
}

Node.prototype.isOutOfBounds = function () {
	return (this.x + this.radius < 0 ||
			this.x - this.radius > this.game.surfaceWidth - 50 ||
			this.y + this.radius < 0 ||
			this.y - this.radius > this.game.surfaceHeight);
	
}