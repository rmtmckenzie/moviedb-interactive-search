// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }


// remap jQuery to $
(function($){

	var curTimeout = -1;
	var averageRespTime = 100;

	/* trigger when page is ready */
	$(document).ready(function (){
		var searchBar = $(".search .search-bar");
		var searchProgress = $(".search .search-progress");
		
		function performSearch(){
			curTimeout = -1;
			textVal = searchBar.val();
			searchProgress.addClass("right");
			searchProgress.animate({width:0},1000);
			//theMovieDb.search.getMulti({query:textVal},function(a){console.log(a)},function(b){console.log(b)}));
		}
		
		searchBar.bind('input propertychange', function(d,e,f) {
			clearTimeout(curTimeout);
			curTimeout = setTimeout(performSearch, 1000);
			searchProgress.clearQueue();
			searchProgress.animate({width:0},2);
			searchProgress.removeClass("right");
			searchProgress.animate({width:searchProgress.parent().width()},1000);
		});
	});
	
	
	/* optional triggers
	
	$(window).load(function() {
		
	});
	
	$(window).resize(function() {
		
	});
	
	*/

})(window.jQuery);