/* main.js
 *
 * Starting point for functionality of program. Sets up other objects and
 * does searching for main Dom elements, which get passed into the various
 * other control objects. 
 */


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
		var footer = $("footer");
		
		searchBar.eq(0).focus();
		
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
		
		//Waits for a change to the actual data contained within the search bar
		searchBar.bind('input propertychange', function(d,e,f) {

			var l = searchBar.val().length;
			
			if(l > 2) {
				//start progress bar animation
				progress.startForward();
				//start waiting to move box to top
				pos.startForward();
				//start waiting for repeated user interaction before searching
				results.startSearch(searchBar.val());
			} else if (l == 0){
				//clear back to beginning if box is emptied
				progress.startBackwards();
				pos.startBackwards();
				results.clear();
			}
		});
		
		//hook up attribution dialog
		var attrInfo = $(".moreinfo",footer).remodal()
		footer.click(function(){
			attrInfo.open();
		});
	});	
	
	//keep search bar in middle of window on resize (or flip on mobile)
	$(window).resize(function (){
		if(state == STATES.EMPTY){
			$('.search').css({
				top: ($(window).height() - $('.search').outerHeight())/2
			});
		}
    });
	
    $(window).resize();
	

})(window.jQuery);