define( ['jquery', 'backbone', 'text!templates/topbar.html'], function($, Backbone, TopbarTemplate) {
	"use strict";
	
	var Topbar = Backbone.View.extend({
		initialize: function() {
		},
		events: {
			'submit #search': 'search'
		},
		search: function(e) {
			var q = $(e.target[0]).val();
			if (q && q.length > 0) {
				location.hash = '#search/' + q;
				$(e.target[0]).val('');
			}
		},
		render: function() {
			$(this.el).html(TopbarTemplate);
			return this;
		}
	});

	return Topbar;
});
