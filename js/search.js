/* search.js
 *
 * Holds the object which controls the search and displaying
 * resulting data.
 */


(function($){
	
	//The control/display class
	function ResultsDisplayer(domJQ,searchType){
		this.dom = domJQ;
		this.resultsDom = $(".masonry-container",domJQ);
		this.displaying = false;
		this.search = null;
		this.timerID = -1;
		
		//default to searching all categories
		this.menuSetType(searchType || SEARCHTYPE.ALL);
		
		var _this = this;
		
		//listen for menu clicks
		var doclick = function(ev){
			_this.menuClick(ev.data,ev);
		}
		$("#menu-all",domJQ).click(SEARCHTYPE.ALL,doclick);
		$("#menu-movie",domJQ).click(SEARCHTYPE.MOVIE,doclick);
		$("#menu-person",domJQ).click(SEARCHTYPE.PERSON,doclick);
		$("#menu-tv",domJQ).click(SEARCHTYPE.TV,doclick);
		
		//add scroll handler for loading more screens
		domJQ.scroll(function(ev){
			_this.handleScroll(ev);
		});
	}
	
	ResultsDisplayer.prototype.setSearchType = function(type){
		var menuitem;
		
		//set function to call and current menu item
		switch(type){
		case SEARCHTYPE.ALL:
			this.searchFunc = theMovieDb.search.getMulti;
			menuitem = $("#menu-all");
		break;
		case SEARCHTYPE.MOVIE:
			this.searchFunc = theMovieDb.search.getMovie;
			menuitem = $("#menu-movie");
		break;
		case SEARCHTYPE.PERSON:
			this.searchFunc = theMovieDb.search.getPerson;
			menuitem = $("#menu-person");
		break;
		case SEARCHTYPE.TV:
			this.searchFunc = theMovieDb.search.getTv;
			menuitem = $("#menu-tv");
		break;
		}
		
		this.searchtype = type;
		return menuitem;
	}
	
	ResultsDisplayer.prototype.menuSetType = function(type){
		//handle setting the menu (change display and save type)
		var menuitem = this.setSearchType(type);
		
		$(".cssmenu li", this.dom).removeClass("active");
		
		menuitem.addClass("active");
	}
	
	ResultsDisplayer.prototype.menuClick = function(type, ev){
		//on click of menu, set it and start searching again with same text
		if(type == this.searchtype){
			return;
		}
		
		this.menuSetType(type);

		this.doSearch();	
	}
	
	ResultsDisplayer.prototype.doSearch = function(page){
		//actually perform the search, using movieDB js library
		var _this = this;
		page = page || 1;
		this.searchFunc(
			{query:this.text, adult:false, page:page},
			function(data){_this.display(data,page)},
			function(data){_this.error(data)}
		);
	}

	ResultsDisplayer.prototype.startSearch = function(text) {
		//start search process (with built-in delay for user to keep typing)
		clearTimeout(this.timerID);
		this.text = text;
		this.timerID = setTimeout(function(_this){
			_this.doSearch();
		},1000,this);
	}

	ResultsDisplayer.prototype.stop = function(){
		//stop last search that was started
		clearTimeout(this.timerID);
	}

	ResultsDisplayer.prototype.display = function(data, page){
		//show the results of the search
		this.displaySearch = this.search;
		
		this.dom.animate({"opacity":1},1000);
		
		//parse results of the movieDB api request
		var d = this.lastData = $.parseJSON(data),
			results = d.results,
			dom, masonry;
			
		//handle first page differently (recreate dom vs append)
		if(page == 1){
			dom = $("<div>",{"class":"masonry-container"});
		} else {
			dom = this.resultsDom;
			masonry = dom.data('masonry');
		}
		
		var doms = [];
		for(var i = 0, l = results.length; i < l; i ++){
			var r = new Result(results[i],dom,this.searchtype);
			doms.push(r.dom[0]);
		}
		
		if(page == 1){
			this.resultsDom.replaceWith(dom);
			this.resultsDom = dom;
		} else {
			masonry.appended(doms);
		}
		
		//needed to make sure that masonry performs properly;
		// images decide position of elements
		dom.imagesLoaded(function(){
			dom.masonry({itemSelector: '.resultElement'});
		});
	}


	ResultsDisplayer.prototype.error = function(err){
		//TODO - should still add better error handling...
		console.log("Error getting results:",err);
	}

	ResultsDisplayer.prototype.clear = function(){
		//clear the data shown in the results section
		var masonry = this.dom.data('masonry');
		
		this.stop();
		this.resultsDom.empty();
		//function sometimes called before masonry intiialized so need guard
		if(masonry){
			this.resultsDom.masonry('destroy');
		}
		this.dom.animate({"opacity":0},1000);
	}
	
	
	ResultsDisplayer.prototype.handleScroll = function(ev){
		//if at bottom, try loading more pages
		if(this.dom.scrollTop() + this.dom.height() == this.dom[0].scrollHeight && this.lastData){
			if(this.lastData.page <= this.lastData.total_pages){
				this.doSearch(this.lastData.page + 1);
			}
		} 
	}

	window.ResultsDisplayer = ResultsDisplayer;
})(window.jQuery);
