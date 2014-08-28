

// remap jQuery to $
(function($){

	var RESULTTYPE = Object.freeze({
		MOVIE:1,PERSON:2,TV:3,
		"movie":1,"person":2,"tv":3
	});
	
	var getImage = function(path){
		return theMovieDb.common.getImage({size:"w185",file:path});
	}	

	function Result(data, parentDom, type, masonry){
		
		if(!type){
			type = RESULTTYPE[data.media_type];
		}
		this.type = type;
	
		this.data = data;
		
		var dom = this.dom = $('<div>',{"class":"resultElement"});
		var title = $('<div>',{"class":"title"});
		var pic = $('<img>',{"class":"thumb"});
		dom.append(title).append(pic);
		
		switch(type){
		case RESULTTYPE.MOVIE:
			title.text(data.title);
			
			if(data.poster_path){
				pic[0].src = getImage(data.poster_path);
			} else {
				pic[0].src = "assets/movie.png";
				pic.addClass("nopic");
			}
			
		break;
		case RESULTTYPE.PERSON:
			title.text(data.name);
			
			if(data.profile_path){
				pic[0].src = getImage(data.profile_path);
			} else {
				pic[0].src = "assets/person.png";
				pic.addClass("nopic");
			}
		break;
		case RESULTTYPE.TV:
			title.text(data.name);
			
			if(data.poster_path){
				pic[0].src = getImage(data.poster_path);
			} else {
				pic[0].src = "assets/tv.png";
				pic.addClass("nopic");
			}
		break;
		}
		this.dom.obj = this;
		
		parentDom.append(this.dom);
	}

	window.Result = Result;

})(window.jQuery);