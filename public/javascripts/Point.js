(function(){
	var Point = function(x,y) {
		this.x = x;
		this.y = y;
	};

	if (typeof module !== 'undefined')
   	module.exports = Point;
  else
    window.Point = Point;

})();

