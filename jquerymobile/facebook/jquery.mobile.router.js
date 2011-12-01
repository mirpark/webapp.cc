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
				
				if (routes.before)
					routes.before({target:target, url:url, data:data});
					
				if (fn !== undefined) {
					fn({target:target, url:url, data:data});
				}
				else 
					console.error("hash router has no hander about " + data.toPage);
					
				if (routes.after)
					routes.after({target:target, url:url, data:data});
				e.preventDefault();
			}
		});
		
	}
})(jQuery);