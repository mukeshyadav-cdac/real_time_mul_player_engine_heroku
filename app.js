
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
  
  require('./public/javascripts/Physics');
  require('./public/javascripts/Point');
  require('./public/javascripts/Circle');
  require('./public/javascripts/server/game_physics_loop');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var game = new Game();
game.initialize(null);

io.sockets.on('connection', function (socket) {
	
  socket.emit('start', game.state);
  
  game.serverPlay = true;
  game.first = true;
  game.serverCount = 0;
  
  game.on('checkSync', function(data){
    socket.emit('checkSync', data);
  });
  
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
