(function(){
	var Circle = function(center,radius) {
		this.x = center.x;
		this.y = center.y;
		this.radius = radius;
		//this.velocity = new Physics.Vector2d(Physics.getRandomInt( 5, 10 ), Physics.getRandomInt( 2, 7 ) );
		this.velocity = new Physics.Vector2d(5, 5 );
		this.manifold = new Physics.Contact();
		this.mass = radius;
	};

	Circle.prototype.draw = function( context, color ) {
		context.beginPath();
		context.arc( this.x, this.y, this.radius, 0, Math.PI*2);
		context.fillStyle = color;
		context.fill();
		console.log(color)
	};

	Circle.prototype.update = function() {
		if( ( this.x - this.radius ) < 0 || ( this.x + this.radius ) > 900 ) {
			this.velocity.x = -this.velocity.x;	
			if( ( this.x - this.radius ) < 0 ) {
				this.x = this.radius;  
			}
			if( ( this.x + this.radius ) > 900) {
				this.x = 900 - this.radius;

			}
		} else if( (this.y - this.radius) < 0 || ( this.y + this.radius ) > 600 ) {
			this.velocity.y = -this.velocity.y;
			if( ( this.y - this.radius ) < 0 ) {
				this.y = this.radius;	
			}
			if( (this.y + this.radius ) > 600 ) {
				this.y = 600 - this.radius;
			}
		}
		this.x += this.velocity.x;
		this.y += this.velocity.y;
	};

	if (typeof module !== 'undefined')
   	module.exports = Circle;
  else
    window.Circle = Circle;

})();

