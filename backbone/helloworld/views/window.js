(function(window, undefined) {
	if (window.Views == undefined)
		window.Views = {};
		
	window.Views.Window = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			$(this.el).prepend("<div id='window'></div>");
			return this;
		}
	});	
})(window);

