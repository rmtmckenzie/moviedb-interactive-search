/* searchBar.js
 *
 * Contains the objects used to control the searchbar, for progress indicator
 * and position.
 *
 */


(function($){

	//Progress bar class.
	function ProgressIndicator(barJQ) {
		this.dom = barJQ;
		this.parent = barJQ.parent();
		this.right = false;
		this.active = false;
	}

	ProgressIndicator.prototype.TIMEOUT1 = 1000;
	ProgressIndicator.prototype.TIMEOUT2 = 1000;

	//starts growing bar towards right
	ProgressIndicator.prototype.startForward = function(){
		var _this = this,
			pw = this.parent.width();
		
		this.toStart()
		this.active = true;
		
		this.dom.animate({width:pw},this.TIMEOUT1,undefined,function(){
			//once growing done, start shrinking towards right
			_this.right = true;
			_this.dom.addClass('right')
				.animate({width:0},_this.TIMEOUT2,undefined,function(){
					_this.active = false;
				});
		});
				
	}

	ProgressIndicator.prototype.toStart = function() {
		//set bar back to left
		this.dom.width(0);
		this.dom.removeClass('right');
		this.right = false;
		this.dom.stop().clearQueue();
	}

	ProgressIndicator.prototype.toFinish = function() {
		//set bar back to right
		this.dom.width(0);
		this.dom.addClass('right');
		this.right = true;
		this.dom.stop().clearQueue();
	}

	ProgressIndicator.prototype.startBackwards = function() {
		//start animation, with 'bar' on right growing towards left
		var _this = this,
			pw = this.parent.width();
		
		this.toFinish();
		
		this.active = true;
		
		this.dom.animate({width:pw},this.TIMEOUT2,undefined,function(){
			//start bar shrinking towards left.
			_this.right = false;
			_this.dom.removeClass('right')
				.animate({width:0},_this.TIMEOUT1,undefined,function(){
					_this.active = false;
				});
		});
	}

	//class for controlling position of box
	//Note: basically taken care of by css transition with delay
	function BoxPos(boxJQ) {
		this.dom = boxJQ;
	}

	BoxPos.prototype.startForward = function() {
		this.dom.addClass('top');

	}

	BoxPos.prototype.startBackwards = function() {
		this.dom.removeClass('top');

	}
	
	window.BoxPos = BoxPos;
	window.ProgressIndicator = ProgressIndicator;
	
})(window.jQuery);