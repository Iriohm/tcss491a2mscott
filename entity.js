var LINE_WIDTH = 2;
var ID = 0;

function Node(game) {
	this.radius = 20
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.x = Math.random() * (game.surfaceWidth - (2 * (this.radius + 10))) + this.radius + 10;
    this.y = Math.random() * (game.surfaceHeight - (2 * (this.radius + 10))) + this.radius + 10;
	this.ID = ID;
	ID++;
	this.color = 'white';
	this.behaviors = [];
	
	// Movement
	this.direction = Math.random() * (Math.PI * 2);
	
	// Collision
	this.isColliding = false;
	
}

Node.prototype.draw = function () {
    this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
	this.ctx.fillStyle = this.color;
	this.ctx.fill();
	this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.strokeStyle = '#000000';
    this.ctx.stroke();
    this.ctx.closePath();
}

Node.prototype.update = function () {
	if	(!this.isColliding && this.x + this.radius >= this.game.surfaceWidth) {
		this.direction = getBounceAngle(this.direction, 0);
		this.isColliding = true;
		
	} else if (!this.isColliding && this.x - this.radius <= 0) {
		this.direction = getBounceAngle(this.direction, Math.PI);
		this.isColliding = true;
		
	} else if (!this.isColliding && this.y + this.radius >= this.game.surfaceHeight) {
		this.direction = getBounceAngle(this.direction, Math.PI / 2);
		this.isColliding = true;
		
	} else if (!this.isColliding && this.y - this.radius <= 0) {
		this.direction = getBounceAngle(this.direction, Math.PI * 3 / 2);
		this.isColliding = true;
		
	} else {
		this.isColliding = false;
		
	}
	
	for	(var i = 0; i < this.game.entities.length; i++) {
		var other = this.game.entities[i];
		if	(this.ID !== other.ID) {
			var other = this.game.entities[i];
			
			for	(var b = 0; b < this.behaviors.length; b++) {
				this.behaviors[b](this, other);
				
			}
			
		}
			
	}
	
    this.x += this.game.clockTick * this.speed * Math.cos(this.direction);
    this.y -= this.game.clockTick * this.speed * Math.sin(this.direction);
}



// Entities
function Blue(game) {
	Node.call(this, game);
	this.color = 'blue';
	//this.behaviors.push(behavior_bounce);
}

Blue.prototype = Object.create(Node.prototype);
Blue.prototype.constructor = Node;


// Behavior for bouncing against other entities
function behavior_bounce(that, other) {
	var x = other.x - that.x;
	var y = other.y - that.y;
			
	var distance = Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));
			
	if	(that.radius + other.radius >= distance) {
		that.direction = getBounceAngle(that.direction, Math.atan2(y, x));
				
	}
	
}

// Calculates bounce angle.
function getBounceAngle(incoming_direction, deflector_angle) {
	var outgoing_direction = incoming_direction - deflector_angle - (Math.PI / 2);
	
	outgoing_direction = Math.atan2(-1 * Math.sin(outgoing_direction), Math.cos(outgoing_direction));
	
	outgoing_direction += deflector_angle + Math.PI / 2;
	if	(outgoing_direction >= Math.PI * 2) { outgoing_direction -= Math.PI * 2 }
	
	return outgoing_direction;
	
}