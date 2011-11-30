// LICENCED
(function($){
	$.router = function(routes) {
		var routes = routes;
		$(document).bind( "pagebeforechange", function( e, data ) {
			if ( typeof data.toPage === "string" ) {
				var u = $.mobile.path.parseUrl( data.toPage ),			
				url = $.url( u.hash.replace( /^#/, "" ) ),
				target = url.attr("host"),
				fn = routes[target];
				
				if (fn !== undefined)
					fn({target:target, url:url});
				else 
					console.error("hash router has no hander about " + url);
			}
		});
		
	}
})(jQuery);