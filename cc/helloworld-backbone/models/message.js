(function(window, undefined) {
	if (window.Models == undefined)
		window.Models = {}
		
	window.Models.Message = Backbone.Model.extend({
		defaults: {
			message: "hello",
		}
	});
})(window);