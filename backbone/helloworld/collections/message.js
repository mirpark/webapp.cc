(function(window, undefined) {
	if (window.Collections == undefined)
		window.Collections = {}
		
	window.Collections.Message = Backbone.Collection.extend({
		model:Models.Message
	});
})(window);