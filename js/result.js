

// remap jQuery to $
(function($){
	
	var NOOVERVIEWTEXT = "Sorry, no overview found!";
	var NOTAGLINETEXT = "Sorry, no tagline found!";
	var NOBIOGRAPHYTEXT = "Sorry, no biography found!";
	
	var getImage = function(path){
		return theMovieDb.common.getImage({size:"w185",file:path});
	}	

	function Result(data, parentDom, type){
		
		if(!type){
			type = SEARCHSTRING[data.media_type];
		}
		this.type = type;
		this.data = data;
		this.parentDom = parentDom;
		
		var dom = this.dom = $('<div>',{"class":"resultElement"});
		dom.append(this.getTitleElement()).append(this.getImageElement());
		
		this.dom.obj = this;
		
		dom.click(this,function(ev){
			ev.data.onClicked();
		});
		
		parentDom.append(this.dom);
	}
	
	Result.prototype.getTitleElement = function(){
		var title = $('<div>',{"class":"title"});
		switch(this.type){
		case SEARCHTYPE.MOVIE:
			title.text(this.data.title);
		break;
		case SEARCHTYPE.TV:
		case SEARCHTYPE.PERSON:
			title.text(this.data.name);
		}
		return title;
	}
	
	Result.prototype.getImageElement = function(){
		var pic = $('<img>',{"class":"thumb"}),
			data = this.data;
		switch(this.type){
		case SEARCHTYPE.MOVIE:
			if(data.poster_path){
				pic[0].src = getImage(data.poster_path);
			} else {
				pic[0].src = "assets/movie.png";
				pic.addClass("nopic");
			}
			
		break;
		case SEARCHTYPE.PERSON:
			if(data.profile_path){
				pic[0].src = getImage(data.profile_path);
			} else {
				pic[0].src = "assets/person.png";
				pic.addClass("nopic");
			}
		break;
		case SEARCHTYPE.TV:
			if(data.poster_path){
				pic[0].src = getImage(data.poster_path);
			} else {
				pic[0].src = "assets/tv.png";
				pic.addClass("nopic");
			}
		break;
		}
		return pic;
	}
	
	Result.prototype.getMasonryItem = function(){
		if(!this.masonryItem){
			this.masonryItem = this.parentDom.masonry('getItem', this.dom[0]);
		}
		return this.masonryItem;
	}
	
	Result.prototype.onClicked = function(){
		var _this = this,
			typeclass;
		
		switch(this.type){
		case SEARCHTYPE.MOVIE:
			typeclass = theMovieDb.movies;
		break;
		case SEARCHTYPE.PERSON:
			typeclass = theMovieDb.people
		break;
		case SEARCHTYPE.TV:
			typeclass = theMovieDb.tv
		break;
		}
		
		
		typeclass.getById({id:this.data.id},
			function(data){_this.displayData(data)},
			function(err){_this.displayErr(err)}
		);
	}
	
	Result.prototype.displayData = function(data){
		var item = this.getMasonryItem()
		
		var d =  $('<div>',{"class":"resultData remodal"});
		d.append(this.getImageElement()).append(this.getTitleElement());
		
		data = $.parseJSON(data);
		
		switch(this.type){
		case SEARCHTYPE.MOVIE:
			d.append($("<div>",{"class":"overview"}).text(data.overview || NOOVERVIEWTEXT));
			d.append($("<div>",{"class":"tagline"}).text(data.tagline || NOTAGLINETEXT));
		break;
		case SEARCHTYPE.PERSON:
			d.append($("<div>",{"class":"biography"}).text(data.biography || NOBIOGRAPHYTEXT));
		break;
		case SEARCHTYPE.TV:
			d.append($("<div>",{"class":"overview"}).text(data.overview || NOOVERVIEWTEXT));
		break;
		}
		
		d.remodal().open();
		
	}

	window.Result = Result;

})(window.jQuery);