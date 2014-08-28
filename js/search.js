
(function($){

	function Searcher(text,display){
		this.text = text;
		this.search = theMovieDb.search.getMulti;
		this.display = display;
	}

	Searcher.prototype.doSearch = function(){
		var d = this.display;
		this.search(
			{query:this.text, adult:false},
			function(data){d.display(data)},
			function(data){d.error(data)}
		);
	}

	function ResultsDisplayer(domJQ){
		this.dom = domJQ;
		this.resultsDom = $(".masonry-container",domJQ);
		this.desplaying = false;
		this.search = null;
		this.timerID = -1;
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

	ResultsDisplayer.prototype.doSearch = function(){
		this.search = new Searcher(this.text, this);
		this.search.doSearch();
	}

	ResultsDisplayer.prototype.display = function(data){
		this.displaySearch = this.search;
		
		
		var d = $.parseJSON(data),
			r = d.results,
			dom = $("<div>",{"class":"masonry-container"});
			
			this.resultsDom;
			
		console.log(r);
		//TODO - add results to screen properly
		
		var els = []
		for(var i = 0, l = r.length; i < l; i ++){
			els.push(new Result(r[i],dom));
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
	}

	window.ResultsDisplayer = ResultsDisplayer;
})(window.jQuery);
