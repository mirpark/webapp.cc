(function(window, undefined) {
	if (window.Views == undefined)
		window.Views = {};
		
	window.Views.Window = Backbone.View.extend({
		el:"body",
		initialize: function() {
			this.render();
		},
		render: function() {
			$(this.el).html("<div id='window'></div>");
			return this;
		}
	});	
})(window);

