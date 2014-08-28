(function($){
	
	//'enum' of types.
	window.SEARCHTYPE = Object.freeze({ALL:0,MOVIE:1,PERSON:2,TV:3});
	//convenient object for mapping strings provided by API or hash to enum.
	window.SEARCHSTRING = Object.freeze({
		"movie":1,"person":2,"tv":3,
		"#movie":1,"#person":2,"#tv":3
	});



})(window.jQuery);