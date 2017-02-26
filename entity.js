var LINE_WIDTH = 2;
var ID = 0;

function Node(game, type, color) {
	this.type = type;
	this.color = color;
	this.radius = 20
    this.speed = 100;
    this.game = game;
    this.ctx = game.ctx;
    this.x = Math.random() * (game.surfaceWidth - (2 * (this.radius + 10))) + this.radius + 10;
    this.y = Math.random() * (game.surfaceHeight - (2 * (this.radius + 10))) + this.radius + 10;
	this.ID = ID;
	ID++;
	
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
	wallBounce(this);
	
	for	(var i = 0; i < this.game.entities.length; i++) {
		var other = this.game.entities[i];
		if	(this.ID !== other.ID) {
			var other = this.game.entities[i];
			
			for	(var b = 0; b < this.type.length; b++) {
				this.type[b](this, other);
				
			}
			
		}
			
	}
	
    this.x += this.game.clockTick * this.speed * Math.cos(this.direction);
    this.y -= this.game.clockTick * this.speed * Math.sin(this.direction);
}