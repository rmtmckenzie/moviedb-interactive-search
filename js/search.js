

function Searcher(text){
	this.text = text;
	this.search = theMovieDb.search.getMulti;
}

Searcher.prototype.doSearch = function(display){
	this.search(
		{query:this.text},
		function(data){display.display(data)},
		function(data){display.error(data)}
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
	this.search = new Searcher(this.text);
	this.search.doSearch(this);
}

ResultsDisplayer.prototype.display = function(data){
	this.displaySearch = this.search;
	//TODO - add results to screen properly
	
	this.resultsDom.text(data);
}

ResultsDisplayer.prototype.error = function(err){
	
}

ResultsDisplayer.prototype.clear = function(){
	//TODO - clear
	this.stop();
	this.resultsDom.text("");
}
