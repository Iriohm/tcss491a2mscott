var AM = new AssetManager();

AM.queueDownload("./img/void.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine(AM.getAsset("./img/void.png"));
    gameEngine.init(ctx);
    gameEngine.start();

	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));	
	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));	
	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));	
	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));	
	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));
	gameEngine.addEntity(new Blue(gameEngine));	
	
    console.log("All Done!");
});