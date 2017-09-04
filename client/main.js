//var socket = io.connect("http://76.28.150.193:8888");
var gameEngine = new GameEngine();

// Commented out. This database was set up by the instructor, and no longer exists.
//socket.on("load", function (data) {
//  console.log("Loading saved state...");
//	
//	gameEngine.setState(data.data);
//	
//    console.log("Saved state loaded");
//	
//});

var AM = new AssetManager();

AM.queueDownload("./img/void.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    gameEngine = new GameEngine(AM.getAsset("./img/void.png"));
    gameEngine.init(ctx);
    gameEngine.start();
	
    console.log("All Done!");
});