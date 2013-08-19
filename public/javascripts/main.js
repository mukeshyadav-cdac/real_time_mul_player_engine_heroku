var syncData;
var game;
function start() {
	var socket = io.connect(window.location.origin);
	canvasE = document.getElementById('canvas');
  con = canvasE.getContext('2d');
  count = 1;
  
  game = new Game();
	
	
	socket.on('start', function (data) {
  	game.initialize(data);
  });

	socket.on('checkSync', function (data) {
		game.clientPlay = data.clientPlay;
		syncData = data;
    if (game.first) {
     for (var i = 1 ; i <= game.circle.length - 1; i++) {
        game.circle[i].x = data.circularArray[1][i]['centre'][0];
        game.circle[i].y = data.circularArray[1][i]['centre'][1];
        game.circle[i].velocity.x = data.circularArray[1][i].velocity[0];
        game.circle[i].velocity.y = data.circularArray[1][i].velocity[1];
      }
      game.first = false;
    }
	});
}

function updateCor( data ) {
  for (var i = 1 ; i <= game.circle.length - 1; i++) {
      game.circle[i].x = data.circularArray[0][i]['centre'][0];
      game.circle[i].y = data.circularArray[0][i]['centre'][1];
      game.circle[i].velocity.x = data.circularArray[0][i].velocity[0];
      game.circle[i].velocity.y = data.circularArray[0][i].velocity[1];       
    }
}