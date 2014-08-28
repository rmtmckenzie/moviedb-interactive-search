

// remap jQuery to $
(function($){

	var RESULTTYPE = {
		MOVIE:0,
		PERSON:1,
		TV:2
	}
	
	var getImage = function(path){
		return theMovieDb.common.getImage({size:"w185",file:path});
	}	

	function Result(data, parentDom){
		this.data = data;
		
		var dom = this.dom = $('<div>',{"class":"resultElement"});
		var title = $('<div>',{"class":"title"});
		var pic = $('<img>',{"class":"thumb"});
		dom.append(title).append(pic);
		
		switch(data.media_type){
		case "movie":
			this.type = RESULTTYPE.MOVIE;
			title.text(data.title);
			
			if(data.poster_path){
				pic[0].src = getImage(data.poster_path);
			} else {
				pic[0].src = "assets/movie.png";

			}
			
		break;
		case "person":
			this.type = RESULTTYPE.PERSON;
			title.text(data.name);
			
			if(data.profile_path){
				pic[0].src = getImage(data.profile_path);
			} else {
				pic[0].src = "assets/person.png";
				pic.addClass("nopic");
			}
		break;
		case "tv":
			this.type = RESULTTYPE.TV;
			title.text(data.name);
			
			if(data.poster_path){
				pic[0].src = getImage(data.poster_path);
			} else {
				pic[0].src = "assets/tv.png";

			}
		break;
		}
		
		parentDom.append(this.dom);
	}

	window.Result = Result;

})(window.jQuery);