
(function($){

	var SEARCHTYPE = Object.freeze({ALL:0,MOVIE:1,PERSON:2,TV:3});
	
	
	function ResultsDisplayer(domJQ){
		this.dom = domJQ;
		this.resultsDom = $(".masonry-container",domJQ);
		this.displaying = false;
		this.search = null;
		this.timerID = -1;
		this.searchType = SEARCHTYPE.ALL;
		this.searchFunc = theMovieDb.search.getMulti;
		
		var _this = this;
		
		var doclick = function(ev){
			_this.menuClick(ev.data);
		}
		
		$("#menu-all",domJQ).click(SEARCHTYPE.ALL,doclick);
		$("#menu-movies",domJQ).click(SEARCHTYPE.MOVIE,doclick);
		$("#menu-people",domJQ).click(SEARCHTYPE.PERSON,doclick);
		$("#menu-tv",domJQ).click(SEARCHTYPE.TV,doclick);
	}
	
	ResultsDisplayer.prototype.menuClick = function(type){
		if(type == this.searchtype){
			return;
		}
		
		switch(type){
		case SEARCHTYPE.ALL:
			this.searchFunc = theMovieDb.search.getMulti;
		break;
		case SEARCHTYPE.MOVIE:
			this.searchFunc = theMovieDb.search.getMovie;
		break;
		case SEARCHTYPE.PERSON:
			this.searchFunc = theMovieDb.search.getPerson;
		break;
		case SEARCHTYPE.TV:
			this.searchFunc = theMovieDb.search.getTv;
		break;
		}
		
		this.searchtype = type;
		this.doSearch();	
	}
	
	ResultsDisplayer.prototype.doSearch = function(){
		var _this = this;
		this.searchFunc(
			{query:this.text, adult:false},
			function(data){_this.display(data)},
			function(data){_this.error(data)}
		);
	}

	ResultsDisplayer.prototype.startSearch = function(text) {
		clearTimeout(this.timerID);
		this.text = text;
		this.timerID = setTimeout(function(_this){
			_this.doSearch();
		},1000,this);
	}

	ResultsDisplayer.prototype.stop = function(){
		clearTimeout(this.timerID);
	}

	ResultsDisplayer.prototype.display = function(data){
		this.displaySearch = this.search;
		
		this.dom.animate({"opacity":1},1000);
		
		var d = $.parseJSON(data),
			r = d.results,
			dom = $("<div>",{"class":"masonry-container"});
						
		console.log(r);
		
		var els = []
		for(var i = 0, l = r.length; i < l; i ++){
			els.push(new Result(r[i],dom,this.searchtype));
		}
		
		this.resultsDom.replaceWith(dom);
		
		dom.imagesLoaded(function(){
			dom.masonry();
		});
		
		this.resultsDom = dom;
	}

	ResultsDisplayer.prototype.error = function(err){
		
	}

	ResultsDisplayer.prototype.clear = function(){
		this.stop();
		this.resultsDom.empty();
		this.resultsDom.masonry('destroy')
		this.dom.animate({"opacity":0},1000);
	}

	window.ResultsDisplayer = ResultsDisplayer;
})(window.jQuery);
