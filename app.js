
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


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
circle_array = []; 

io.sockets.on('connection', function (socket) {
	//debugger
	if( circle_array.length == 0 ){
		for (var i = 1 ; i <= 5; i++) {
 			circle_array[i] = [getRandomInt(100,800), getRandomInt(100, 500), getRandomInt(10, 50)];
 		};
 	}
  socket.emit('start', circle_array);
  
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
