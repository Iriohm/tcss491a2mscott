// Behavior for bouncing against other entities
function behavior_bounce(that, other) {
	var x = other.x - that.x;
	var y = other.y - that.y;
			
	var distance = Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));
			
	if	(that.radius + other.radius >= distance) {
		that.direction = getBounceAngle(that.direction, Math.atan2(y, x));
				
	}
	
}


// Behavior for seeking out other Nodes
function behavior_seeker(that, other) {
	
	
}


// Collision detection for walls.
function wallBounce(entity) {
	if	(!entity.isColliding && entity.x + entity.radius >= entity.game.surfaceWidth) {
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