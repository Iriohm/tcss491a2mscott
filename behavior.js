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
	
	if	(typeof(that.seek_other) === "undefined") {
		that.seek_other = that;
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
			that.seek_other = other;
			
		}
		
	}
		
	if	(getDistance(that, other) < 5) {
			other.destroy = true;
	}
	
}

function behavior_eat_after(that) {
	if	(!that.isColliding) {
		that.direction = Math.atan2(-1 * (that.seek_other.y - that.y), that.seek_other.x - that.x);
				
	}
	
}


// Behavior for boosting speed for a short while upon collision
function behavior_speedboost_before(that) {
	if	(typeof(that.original_speed) === "undefined") {
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


// Behavior for friction
function behavior__before(that) {
}

function behavior__loop(that, other) {
}

function behavior__after(that) {
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