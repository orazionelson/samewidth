/**
 * Set same width in a group of elements
 * by Alfredo Cosco 2015
 * */
(function ( $ ) {
	$.fn.getSameWidth = function (){
		var w=[];
		var selector = this;
		$(selector).children().each(function(){
			var val = $(this).outerWidth(); 
			w.push(val);
		});
		var maxw = Math.max.apply(Math, w);
		if($(selector).children().css('display')=='inline-block'){
			$(selector).children().css('width', maxw);
		}
		
		$(window).resize(function () {
			$(selector).children().removeAttr( "style" );
			$(selector).getSameWidth();
		});
	};

}( jQuery ));
