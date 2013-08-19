(function () {
	
	var Game = function() {
		this.frame_time = 1000/60;
		this.lastTime = 0;
		this.circle = [];
		this.state = [];
		this.color = ['blank','red','black','green','blue', 'gray'];
		this.clientPlay = false;
		this.serverPlay = false;
		this.circularArray = [];
		this.clientCount = 0;
	};

	if (typeof module !== 'undefined') {
		var count = 0;
		var EventEmitter = require('events').EventEmitter;
		Game.prototype.__proto__ = EventEmitter.prototype;
	}

	Game.prototype.requestAnimationFrame = function(callback) {
 		var currTime = Date.now()
 		var timeToCall = Math.max( 0, this.frame_time - ( currTime - this.lastTime ) );
  	setTimeout( function() { callback(); }, timeToCall );
  	this.lastTime = currTime + timeToCall;
 	};

 	Game.prototype.initialState = function() {
 		for (var i = 1 ; i <= 5; i++) {
 			this.state[i] = {
 												'centre': new Point( Physics.getRandomInt(100,800), Physics.getRandomInt(100, 500) ),
 												'radius': Physics.getRandomInt(10, 50)
 											};
 		}
 		return this.state;
 	};

	Game.prototype.initialize = function(state) {
		state = state || this.initialState();
		for (var i = 1 ; i <= 5; i++) {
 			this.circle[i] = new Circle( state[i]['centre'], state[i]['radius'] );
 		}
 		if (typeof module !== 'undefined') 
 			this.serverRender();
 		else
 			this.clientRender();			
	};

	Game.prototype.clientRender = function() {		
		if( this.clientPlay  == true ) {
			
			if ((this.clientCount % 60)  == 40) {
        if( syncData) {
        	updateCor(syncData);
        }
				syncData = undefined;
      }
      
      this.clientCount = this.clientCount + 1;
			con.clearRect( 0, 0, 900, 600 );

			for (var i = 1; i <= 5; i++) {
				var  circleFirst = this.circle[i];
				for (var j = i+1; j <= 5; j++ ) {
					Physics.collisionDetection( circleFirst, this.circle[j] );	
					Physics.collisionResolve( circleFirst, this.circle[j] );
				};
			};
	
			for (var i = 1; i <= 5; i++) {
				this.circle[i].update();
				this.circle[i].draw( con, this.color[i] );
			};
		}
		this.requestAnimationFrame( this.clientRender.bind(this) );	
	};

	Game.prototype.serverRender = function() {
		if( this.serverPlay) {

			if ( count == 59 ) {
				//var clonned  = JSON.parse( JSON.stringify( this.circularArray ));
				this.emit('checkSync', { 'circularArray': this.circularArray, 'clientPlay': true  } );
				count = 0; 
			} 
			
			if ( count == 40 ) {
				this.circularArray[0] = [];
				for (var i = 1 ; i <= 5; i++) {
	 				this.circularArray[0][i] = {
	 																				'centre': [ this.circle[i].x, this.circle[i].y ],
	 																				'radius': this.circle[i].radius,
	 																				'velocity': [ this.circle[i].velocity.x, this.circle[i].velocity.y ]
	 																			};
			 	}

			}
			
			count = count + 1;

			for (var i = 1; i <= 5; i++) {
				var  circleFirst = this.circle[i];
				for (var j = i+1; j <= 5; j++ ) {
					Physics.collisionDetection( circleFirst, this.circle[j] );	
					Physics.collisionResolve( circleFirst, this.circle[j] );
				};
			};
	
			for (var i = 1; i <= 5; i++) {
				this.circle[i].update();
			};
		}
		this.requestAnimationFrame( this.serverRender.bind(this) );
		
			
	};

	//exports = Game;
	if (typeof module !== 'undefined')
   	global.Game = Game;
  else
    window.Game = Game;

})();

