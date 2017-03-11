// Behavior for bouncing against other entities
function behavior_bounce_loop(that, other) {
	var x = other.x - that.x;
	var y = other.y - that.y;
			
	var distance = getDistance(that, other);
			
	if	(that.radius + other.radius >= distance &&
		 !that.isColliding && !other.isColliding) {
		//that.direction = getBounceAngle(that.direction, Math.atan2(y, x));
		that.direction = Math.atan2(y, x) + Math.PI;
				
	}
	
}


// Behavior for seeking out and eating other Nodes
function behavior_eat_before(that) {
	that.seek_distance = 9001;
	
	if	(that.seek_other_x === "undefined" || that.seek_other_y === "undefined") {
		that.seek_other_x = that.x;
		that.seek_other_y = that.y;
		that.speed = 0;
	}
	
}

function behavior_eat_loop(that, other) {
	if	(other.type !== 'red') {
		that.speed = 50;
		if	(Math.sqrt(Math.pow(Math.abs(other.x - that.x), 2)
							 + Math.pow(Math.abs(other.y - that.y), 2)) < that.seek_distance) {
			var distance = getDistance(that, other);
			
			that.seek_distance = getDistance(that, other);
			that.seek_other_x = other.x;
			that.seek_other_y = other.y;
			
		}
		
	}
		
	if	(getDistance(that, other) < 5) {
			other.destroy = true;
	}
	
}

function behavior_eat_after(that) {
	if	(!that.isColliding) {
		that.direction = Math.atan2(-1 * (that.seek_other_y - that.y), that.seek_other_x - that.x);
				
	}
	
}


// Behavior for boosting speed for a short while upon collision
function behavior_speedboost_before(that) {
	if	(that.original_speed === "undefined") {
		that.original_speed = that.speed;
	}
}

function behavior_speedboost_loop(that, other) {			
	if	(that.radius + other.radius >= getDistance(that, other) &&
		 !that.isColliding && !other.isColliding) {
		that.speed = Math.min(300, that.speed + other.speed / 2);
				
	}
	
}

function behavior_speedboost_after(that) {
	if	(that.speed > that.original_speed) {
		that.speed -= 1;
	}
	
}


// Behavior for friction Nodes
function behavior_inert_loop(that, other) {
	if	(that.radius + other.radius >= getDistance(that, other) &&
		 !that.isColliding && !other.isColliding) {
		that.speed = Math.min(200, that.speed + other.speed / 2);
		that.direction = other.direction;
				
	}
}

function behavior_inert_after(that) {
	if	(that.speed > 0) {
		that.speed -= 1;
	}
}


// Behavior for splitting
function behavior_split_before(that) {
	if	(that.has_split === "undefined") {
		that.has_split = false;
		
	}
	
}

function behavior_split_loop(that, other) {
	if	(!that.has_split) {
		if	(that.radius + other.radius >= getDistance(that, other) &&
			!that.isColliding && !other.isColliding) {
			
			var iChildren = 4;
			for (var i = 0; i < iChildren; i++) {
				var child = new Node(that.game, that.color, that.speed * 1.5, that.radius / 2);
				child.has_split = true;
				child.x = that.x;
				child.y = that.y;
				child.type = that.type;
				that.game.addEntity(child);
			}
			
			that.has_split = true;
			that.destroy = true;
				
		}
				
	}
	
}


// Behavior for mirroring
function behavior_mirror_loop(that, other) {
	if	(that.radius + other.radius >= getDistance(that, other) &&
		!that.isColliding && !other.isColliding) {
			
		for (var i = 0; i < that.game.entities.length; i++) {
			var node = that.game.entities[i];
			if	(node.type === that.type && !node.isColliding) {
				node.direction = that.direction;
				node.speed = that.speed;
			}
			
		}
				
	}
	
}


// Behavior for RAINBOW
function behavior_RAINBOW_loop(that, other) {
	var x = other.x - that.x;
	var y = other.y - that.y;
			
	var distance = getDistance(that, other);
			
	if	(that.radius + other.radius >= distance &&
		 !that.isColliding && !other.isColliding) {
		that.x = Math.random() * (that.game.surfaceWidth - 50 - (2 * (that.radius + 10))) + that.radius + 10;
		that.y = Math.random() * (that.game.surfaceHeight - (2 * (that.radius + 10))) + that.radius + 10;
		that.direction = Math.random() * (Math.PI * 2);
		
		if	(other.type !== "RAINBOW") {	
			var chaos = colors[Math.floor(Math.random() * colors.length)];
			other.type = chaos;
			other.color = chaos;
		
		}
				
	}
	
}


// Collision detection for walls.
function wallBounce(entity) {
	if	(!entity.isColliding && entity.x + entity.radius >= entity.game.surfaceWidth - 50) {
		entity.direction = getBounceAngle(entity.direction, 0);
		entity.isColliding = true;
		
	} else if (!entity.isColliding && entity.x - entity.radius <= 0) {
		entity.direction = getBounceAngle(entity.direction, Math.PI);
		entity.isColliding = true;
		
	} else if (!entity.isColliding && entity.y + entity.radius >= entity.game.surfaceHeight) {
		entity.direction = getBounceAngle(entity.direction, Math.PI / 2);
		entity.isColliding = true;
		
	} else if (!entity.isColliding && entity.y - entity.radius <= 0) {
		entity.direction = getBounceAngle(entity.direction, Math.PI * 3 / 2);
		entity.isColliding = true;
		
	} else {
		entity.isColliding = false;
		
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

function getDistance(that, other) {
	var x = other.x - that.x;
	var y = other.y - that.y;
	return Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));
}