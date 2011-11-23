(function(window, undefined) {
	var App = Backbone.Router.extend({
		initialize: function() {
		},
		routes: {
			 "": 					"index",
			"*actions": "defaultAction"
		},
		index: function() {
			var v = new Views.MessageView({el:'#window'});
		},
		defaultAction: function(actions) {
		}
	});
	
	App.prototype.init = function() {
		this.window = new Views.Window({el:'body'}).render();
		Backbone.sync = function (method, model, options) {
			/* DO NOTHING, dummy persistence strategy */
			return true;
		}
		Backbone.history.start();
	}

	window.App = App;
})(window);