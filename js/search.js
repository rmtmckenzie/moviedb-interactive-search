

function ProgressIndicator(barJQ) {
	this.dom = barJQ;
	this.parent = barJQ.parent();
	this.right = false;
	this.active = false;
}

ProgressIndicator.prototype.TIMEOUT1 = 1000;
ProgressIndicator.prototype.TIMEOUT2 = 1000;

ProgressIndicator.prototype.startForward = function(){
	var _this = this,
		pw = this.parent.width();
	
	this.toStart()
	this.active = true;
	
	this.dom.animate({width:pw},this.TIMEOUT1,undefined,function(){
		_this.right = true;
		_this.dom.addClass('right')
			.animate({width:0},_this.TIMEOUT2,undefined,function(){
				_this.active = false;
			});
	});
			
}

ProgressIndicator.prototype.toStart = function() {
	this.dom.width(0);
	this.dom.removeClass('right');
	this.right = false;
	this.dom.stop().clearQueue();
}

ProgressIndicator.prototype.toFinish = function() {
	this.dom.width(0);
	this.dom.addClass('right');
	this.right = true;
	this.dom.stop().clearQueue();
}

ProgressIndicator.prototype.startBackwards = function() {
	var _this = this,
		pw = this.parent.width();
	
	this.toFinish();
	
	this.active = true;
	
	this.dom.animate({width:pw},this.TIMEOUT2,undefined,function(){
		_this.right = false;
		_this.dom.removeClass('right')
			.animate({width:0},_this.TIMEOUT1,undefined,function(){
				_this.active = false;
			});
	});
}
