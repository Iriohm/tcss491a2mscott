window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

function GameEngine(background) {
	this.background = background;
    this.entities = [];
    this.ctx = null;
    this.surfaceWidth = null;
    this.surfaceHeight = null;
	this.red = 0;
	this.green = 0;
	this.blue = 0;
	this.color_up = true;
}

GameEngine.prototype.init = function (ctx) {
    this.ctx = ctx;
    this.surfaceWidth = this.ctx.canvas.width;
    this.surfaceHeight = this.ctx.canvas.height;
    this.timer = new Timer();
	var that = this;
	
	this.ctx.canvas.addEventListener("click", function(event) {
		var x = event.clientX - that.ctx.canvas.getBoundingClientRect().left;
		var y = event.clientY - that.ctx.canvas.getBoundingClientRect().top;
		
		clickButton(that, x, y);

	}, false);
	
    console.log('game initialized');
}

GameEngine.prototype.start = function () {
    console.log("starting game");
    var that = this;
    (function gameLoop() {
        that.loop();
        requestAnimFrame(gameLoop, that.ctx.canvas);
    })();
}

GameEngine.prototype.addEntity = function (entity) {
    console.log('added entity');
    this.entities.push(entity);
}

GameEngine.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.surfaceWidth, this.surfaceHeight);
    this.ctx.save();
	this.ctx.drawImage(this.background, 0, 0, this.surfaceWidth - 50, this.surfaceHeight);
    for (var i = 0; i < this.entities.length; i++) {
        this.entities[i].draw(this.ctx);
    }
	
	var increment = 25;
	if	(this.color_up) { 
		if	(this.red + increment < 256) { this.red += increment; }
		else if	(this.green + increment < 256) { this.green += increment; }
		else if	(this.blue + increment < 256) { this.blue += increment; }
		else { this.color_up = false; }
	} else {
		if	(this.red - increment > 0) { this.red -= increment; }
		else if	(this.green - increment > 0) { this.green -= increment; }
		else if	(this.blue - increment > 0) { this.blue -= increment; }
		else { this.color_up = true; }
		
	}
		
	
	this.ctx.lineWidth = LINE_WIDTH;
    this.ctx.strokeStyle = '#000000';
	this.ctx.font = "italic 14px Arial";
	
	// Insert buttons here
		// White Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 4, 42, 42);
		this.ctx.fillStyle = 'white';
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		// Red Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 54, 42, 42);
		this.ctx.fillStyle = 'red';
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		// Green Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 104, 42, 42);
		this.ctx.fillStyle = 'green';
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		// Blue Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 154, 42, 42);
		this.ctx.fillStyle = 'blue';
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		// Yellow Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 204, 42, 42);
		this.ctx.fillStyle = 'yellow';
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		// Cyan Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 254, 42, 42);
		this.ctx.fillStyle = 'cyan';
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		// RAINBOW Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 304, 42, 42);
		this.ctx.fillStyle = "rgb(" + this.red + ", " + this.green + ", " + this.blue + ")";
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		// Save Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 354, 42, 42);
		this.ctx.fillStyle = 'gray';
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		this.ctx.beginPath();
		this.ctx.fillStyle = 'black';
		this.ctx.fillText("SAVE", this.surfaceWidth - 44, 378);
		this.ctx.closePath();
		
		// Load Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 404, 42, 42);
		this.ctx.fillStyle = 'gray';
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		this.ctx.beginPath();
		this.ctx.fillStyle = 'black';
		this.ctx.fillText("LOAD", this.surfaceWidth - 44, 428);
		this.ctx.closePath();
		
		// Clear Button
		this.ctx.beginPath();
		this.ctx.rect(this.surfaceWidth - 46, 454, 42, 42);
		this.ctx.fillStyle = 'gray';
		this.ctx.fill();
		this.ctx.stroke();
		this.ctx.closePath();
		
		this.ctx.beginPath();
		this.ctx.strokeStyle = '#BB0000';
		this.ctx.lineWidth = 5;
		this.ctx.moveTo(this.surfaceWidth - 38, 462);
		this.ctx.lineTo(this.surfaceWidth - 12, 488);
		this.ctx.moveTo(this.surfaceWidth - 12, 462);
		this.ctx.lineTo(this.surfaceWidth - 38, 488);
		this.ctx.stroke();
		this.ctx.closePath();
	
    this.ctx.restore();
}

GameEngine.prototype.update = function () {
    var entitiesCount = this.entities.length;

    for (var i = 0; i < entitiesCount; i++) {
        var entity = this.entities[i];
        entity.update();
		if	(entity.isOutOfBounds()) {
			entity.x = (this.surfaceWidth - 50) / 2;
			entity.y = this.surfaceHeight / 2;
			
		}
		if	(entity.destroy) {
			this.entities.splice(i, 1);
			entitiesCount--;
		}
    }
}

GameEngine.prototype.loop = function () {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
}

GameEngine.prototype.getState = function () {
	var output = [];
	output.push(ID);
	
	for	(var i = 0; i < this.entities.length; i++) {
		var node = this.entities[i];
		var data = [node.type, node.color, node.radius, node.speed, node.x, node.y, 
					node.ID, node.direction, node.isColliding, node.destroy, 
					node.seek_distance, node.seek_other_x, node.seek_other_y, node.original_speed, node.has_split];
					
		output.push(data);
		
	}
	
	console.log("Returning " + output);
	return output;
	
}

GameEngine.prototype.setState = function (input) {
	ID = input[0];
	this.entities = [];
	
	for	(var i = 1; i < input.length; i++) {
		var data = input[i];
		console.log("Loading " + data);
		var node = new Node(this, data[0], data[3], data[2]);
		
		node.color = data[1];
		node.x = data[4];
		node.y = data[5];
		node.ID = data[6];
		node.direction = data[7];
		node.isColliding = data[8];
		node.destroy = data[9];
		node.seek_distance = data[10];
		node.seek_other_x = data[11];
		node.seek_other_y = data[12];
		node.original_speed = data[13];
		node.has_split = data[14];
		
		this.entities.push(node);
		
	}
	
}

function Timer() {
    this.gameTime = 0;
    this.maxStep = 0.05;
    this.wallLastTimestamp = 0;
}

Timer.prototype.tick = function () {
    var wallCurrent = Date.now();
    var wallDelta = (wallCurrent - this.wallLastTimestamp) / 1000;
    this.wallLastTimestamp = wallCurrent;

    var gameDelta = Math.min(wallDelta, this.maxStep);
    this.gameTime += gameDelta;
    return gameDelta;
}

function Entity(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.removeFromWorld = false;
}

Entity.prototype.update = function () {
}

Entity.prototype.draw = function (ctx) {
    if (this.game.showOutlines && this.radius) {
        this.game.ctx.beginPath();
        this.game.ctx.strokeStyle = "green";
        this.game.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}


// BUTTONS
function clickButton(game, x, y) {
	if	(game.surfaceWidth - 46 <= x && x <= game.surfaceWidth - 4) {
		if	(4 <= y && y <= 46) {
			// White Button
			game.addEntity(new Node(game, 'white', 100, 15));
		} else if	(54 <= y && y <= 96) {
			// Red Button
			game.addEntity(new Node(game, 'red', 50, 15));
		} else if	(104 <= y && y <= 146) {
			// Green Button
			game.addEntity(new Node(game, 'green', 100, 15));
		} else if	(154 <= y && y <= 196) {
			// Blue Button
			game.addEntity(new Node(game, 'blue', 100, 15));
		} else if	(204 <= y && y <= 246) {
			// Yellow Button
			game.addEntity(new Node(game, 'yellow', 100, 15));
		} else if	(254 <= y && y <= 296) {
			// Cyan Button
			game.addEntity(new Node(game, 'cyan', 100, 15));
		} else if	(304 <= y && y <= 346) {
			// RAINBOW Button
			game.addEntity(new Node(game, 'RAINBOW', 100, 15));
		} else if	(354 <= y && y <= 396) {
			// Save Button
			var data = game.getState();
			socket.emit("save", { studentname: "iriohm", statename: "saved_state", data: data });
		} else if	(404 <= y && y <= 446) {
			// Load Button
			socket.emit("load", { studentname: "iriohm", statename: "saved_state" });
		} else if	(454 <= y && y <= 496) {
			// Clear Entities
			game.entities.splice(0, game.entities.length);
			
		}
		
	}
}