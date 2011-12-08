// LICENCED
(function($){
	$.getTmpl = function(url, options, callback) {
		// jqeurymobile generator can't make a valid widgets.
		// before template isn't finished downloading
		var template = null;
		$.ajax({async: (callback == undefined) ? false : true,
			url: url,
			type: 'GET',
			html: "html",
			success: function(data, status, xhr) {
				$("body").append(data);
				var args = (options.args) ? eval(options.args) : null;
				template = $(options.id).tmpl(args);
				
				if (callback !== undefined)
					callback(template);
				
				if (options.remove === true) {
					$(options.id).remove();
					delete args;
				}
			}
		});
		return template;
	}
})(jQuery);