(function() {
	var Player = function(position) {
		this.x = position.x;
		this.y = position.y;
		this.rotateAngle = 0;
	};

	Player.prototype.draw = function( context, color ) {
		context.beginPath();
		context.arc( this.x, this.y, 20, 0, Math.PI*2);
		context.fillStyle = color;
		context.fill();
		context.save();
		context.beginPath();
		context.translate(this.x, this.y);
		context.rotate( this.rotateAngle);
		context.moveTo(0, 0);
		context.lineTo(20, 0);
		context.stroke();
		context.restore();
	};

	Player.prototype.rotate = function() {
		this.rotateAngle = ( this.rotateAngle - Math.PI / 36 ) % 360;
	};

	Player.prototype.antiRotate = function() {
		this.rotateAngle = ( this.rotateAngle + Math.PI / 36 ) % 360;
	}


	

	if (typeof module !== 'undefined')
   	global.Player = Player;
  else
    window.Player = Player;


})();