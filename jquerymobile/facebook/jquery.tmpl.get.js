// LICENCED
(function($){
	$.getTmpl = function(url, appendTo, option) {
		// MUST BE using asynchonous io with ajax, if the template isn't finished downloading,
		// before jqeurymobile generator can't make a valid widgets.
		$.ajax({async: false,
			url: url,
			type: 'GET',
			html: "html",
			success: function(data, status, xhr) {
				$("body").append(data);
				var args = eval(option.args);
				console.log(option.args, args, "#sidebar");
				$(option.id).tmpl(args).appendTo(appendTo);
				if (option.remove === true) {
					// Remove allocated resources.
					$(option.id).remove();
					delete args;
				}
			}
		});
	}
})(jQuery);