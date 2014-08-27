

// remap jQuery to $
(function($){

	var RESULTTYPE = {
		MOVIE:0,
		PERSON:1,
		TV:2
	}
		

	function Result(data, parentDom){
		this.data = data;
		
		var dom = this.dom = $('<div>',{"class":"resultElement"})
		
		switch(data.media_type){
		case "movie":
			this.type = RESULTTYPE.MOVIE;
			dom.text(data.title);
		break;
		case "person":
			this.type = RESULTTYPE.PERSON;
			dom.text(data.name);
		break;
		case "tv":
			this.type = RESULTTYPE.TV;
			dom.text(data.name);
		break;
		}
		
		parentDom.append(this.dom);
	}

	window.Result = Result;

})(window.jQuery);