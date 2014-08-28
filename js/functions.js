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
	var search = null;
	
	var KEYTIMEOUT = 1000;

	/* trigger when page is ready */
	$(document).ready(function (){
		var searchDiv = $(".search")
		var searchBar = $(".search .search-bar");
		var searchProgress = $(".search .search-progress");
		var resultsDiv = $(".content");
		
		var progress = new ProgressIndicator(searchProgress);
		var pos = new BoxPos(searchDiv);
		
		var hash = location.hash;
		var results = new ResultsDisplayer(resultsDiv,SEARCHSTRING[hash]);
		
		//to stop flash at top before centred.
		searchDiv.transition({opacity:1},500);
		
		searchBar.keyup(function(ev){
			//enter
			if(ev.keyCode == 13) {
				searchBar.blur();
			}
		});
		
		searchBar.bind('input propertychange', function(d,e,f) {

			var l = searchBar.val().length;
			
			if(l > 2) {
				progress.startForward();
				pos.startForward();
				results.startSearch(searchBar.val());
			} else if (l == 0 /* AND showing results */){
				progress.startBackwards();
				pos.startBackwards();
				results.clear();
			}
			
		});
	});	
	
	$(window).resize(function (){
		if(state == STATES.EMPTY){
			$('.search').css({
				top: ($(window).height() - $('.search').outerHeight())/2
			});
		}
    });
	
    $(window).resize();
	

})(window.jQuery);