var frame_time = 30/1000; // run the local game at 16ms/ 60hz
//if('undefined' != typeof(global)) frame_time = 45; //on server we run at 45ms, 22hz
( function () {
		var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

    for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if ( !window.requestAnimationFrame ) {
        window.requestAnimationFrame = function ( callback, element ) {
            var currTime = Date.now(), timeToCall = Math.max( 0, frame_time - ( currTime - lastTime ) );
            var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if ( !window.cancelAnimationFrame ) {
        window.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };
    }

}() );

var circle = [];
var color = ['blank','red','black','green','blue', 'white'];
function start() {
	var socket = io.connect('http://localhost');
	canvasE = document.getElementById('canvas');
  con = canvasE.getContext('2d');
  count = 1;
	socket.on('start', function (data) {
  	console.log(data);
  	for (var i = 1 ; i <= 5; i++) {
 			circle[i] = new Circle(new Point( data[i][0], data[i][1]), data[i][2]);
 		};
 		if( count == 1)
 			renderme();
 		count = count + 1;		 
	});
}

function renderme() {

	con.clearRect( 0, 0, 900, 600 );
	
	for (var i = 1; i <= 5; i++) {
		var  circleFirst = circle[i];
		for (var j = i+1; j <= 5; j++ ) {
			Physics.collisionDetection( circleFirst, circle[j] );	
			Physics.collisionResolve( circleFirst, circle[j] );
		};
	};
	console.log('me');
	
	for (var i = 1; i <= 5; i++) {
		circle[i].update();
		circle[i].draw( con, color[i] );
	};
	window.requestAnimationFrame( renderme );	
}

