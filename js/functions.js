// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }


// remap jQuery to $
(function($){
	var STATES = Object.freeze({EMPTY:0,UNLOADED:1,LOADING:2,LOADED:3});


	var typeTimeout = -1;
	var loadTimeout = -1;
	var averageRespTime = 100;
	var state = STATES.EMPTY;
	
	var KEYTIMEOUT = 1000;

	/* trigger when page is ready */
	$(document).ready(function (){
		var searchDiv = $(".search")
		var searchBar = $(".search .search-bar");
		var searchProgress = $(".search .search-progress");
		
		function doneSearch(){
			state = STATES.LOADED;
			searchDiv.addClass("top");
			//searchDiv.animate({top:0},1000)
		}
		
		function keyTimeout(){
		
			if (searchBar.val().length == 0){
				//clear all
				searchDiv.removeClass("top");
				state = STATES.EMPTY;
				//todo: delete masonry blocks
				$(window).resize();
			} else {
			
				state = STATES.LOADING;
				typeTimeout = -1;
				textVal = searchBar.val();
				searchProgress.addClass("right");
				searchProgress.animate({width:0},1000);
				
				loadTimeout = setTimeout(doneSearch, 1000);
				
				//theMovieDb.search.getMulti({query:textVal},function(a){console.log(a)},function(b){console.log(b)}));
			}
		}
		
		searchBar.bind('input propertychange', function(d,e,f) {
			clearTimeout(typeTimeout);
			clearTimeout(doneSearch);
			var l = searchBar.val().length;
			
			if (0 < l && l < 3) {
				//don't erase last results or show new
				if(state != STATES.LOADED){
					state = STATES.UNLOADED
				}
			} else {
				//3 or greater, wait for next keypress or timeout
				typeTimeout = setTimeout(keyTimeout, KEYTIMEOUT);
				searchProgress.clearQueue();
				searchProgress.animate({width:0},2);
				searchProgress.removeClass("right");
				searchProgress.animate({width:searchProgress.parent().width()},KEYTIMEOUT);
			}
		});
	});
	
	
	$(window).resize(function (){
		if(state == STATES.EMPTY){
			console.log("resizing", state)
			$('.search').css({
				top: ($(window).height() - $('.search').outerHeight())/2
			});
		}
    });
    $(window).resize();
	
	/* optional triggers
	
	$(window).load(function() {
		
	});
	
	$(window).resize(function() {
		
	});
	
	*/

})(window.jQuery);