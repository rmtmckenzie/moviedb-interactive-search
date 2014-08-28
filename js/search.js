
(function($){
	
	function ResultsDisplayer(domJQ,searchType){
		this.dom = domJQ;
		this.resultsDom = $(".masonry-container",domJQ);
		this.displaying = false;
		this.search = null;
		this.timerID = -1;
		
		this.menuSetType(searchType || SEARCHTYPE.ALL);
		
		var _this = this;
		
		var doclick = function(ev){
			_this.menuClick(ev.data,ev);
		}
		
		$("#menu-all",domJQ).click(SEARCHTYPE.ALL,doclick);
		$("#menu-movie",domJQ).click(SEARCHTYPE.MOVIE,doclick);
		$("#menu-person",domJQ).click(SEARCHTYPE.PERSON,doclick);
		$("#menu-tv",domJQ).click(SEARCHTYPE.TV,doclick);
		
		domJQ.scroll(function(ev){
			_this.handleScroll(ev);
		});
	}
	
	ResultsDisplayer.prototype.setSearchType = function(type){
		var menuitem;
		
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
		var menuitem = this.setSearchType(type);
		
		$(".cssmenu li", this.dom).removeClass("active");
		
		menuitem.addClass("active");
	}
	
	ResultsDisplayer.prototype.menuClick = function(type, ev){
		if(type == this.searchtype){
			return;
		}
		
		this.menuSetType(type);

		this.doSearch();	
	}
	
	ResultsDisplayer.prototype.doSearch = function(page){
		var _this = this;
		page = page || 1;
		this.searchFunc(
			{query:this.text, adult:false, page:page},
			function(data){_this.display(data,page)},
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

	ResultsDisplayer.prototype.display = function(data, page){
		this.displaySearch = this.search;
		
		this.dom.animate({"opacity":1},1000);
		
		var d = this.lastData = $.parseJSON(data),
			results = d.results,
			dom, masonry,packery;
			
			
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
		
		dom.imagesLoaded(function(){
			dom.masonry({itemSelector: '.resultElement'});
		});
	}

	ResultsDisplayer.prototype.error = function(err){
		
	}

	ResultsDisplayer.prototype.clear = function(){
		this.stop();
		this.resultsDom.empty();
		this.resultsDom.masonry('destroy')
		this.dom.animate({"opacity":0},1000);
	}
	
	ResultsDisplayer.prototype.handleScroll = function(ev){
		//if at bottom
		if(this.dom.scrollTop() + this.dom.height() == this.dom[0].scrollHeight && this.lastData){
			if(this.lastData.page <= this.lastData.total_pages){
				this.doSearch(this.lastData.page + 1);
			}
			console.log("bottom!");
		} 
	}

	window.ResultsDisplayer = ResultsDisplayer;
})(window.jQuery);
