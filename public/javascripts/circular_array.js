(function () {
	
	var CircularArray = function(size) {
  	this.size = size || 32;
  	this.circularArray = [];
	};

	CircularArray.prototype.nextIndex = 0;

	CircularArray.prototype.add = function(item) {
  	this.circularArray[this.nextIndex] = item;
  	this.nextIndex = (this.nextIndex + 1) % this.size;
	};

	CircularArray.prototype.get = function(index) {
  	return this.circularArray[index];
	};

	CircularArray.prototype.set = function(index, item) {
  	this.circularArray[index] = item;
	};
	
	CircularArray.prototype.clear = function() {
  	this.circularArray.length = 0;
  	this.nextIndex = 0;
	};
	
})();