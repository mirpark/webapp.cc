define([
	'jquery', 
	'backbone', 
	'hogan',
	'text!templates/status.html', 
	'jquery.iscroll',
	'bootstrap.buttons',
	'bootstrap.modal',
	'bootstrap.alerts'], 
	function($, Backbone, hogan, StatusTemplate) {
	
	"use strict";
	
	var StatusView = Backbone.View.extend({
		initialize: function() {
			$(this.el).css('width', this.options.width).css('height', this.options.height);
			
			this.collection.view = this;
			this.collection.bind("refresh", this.renderList);
			this.fetch();
		},
		events: {
		},
		fetch: function() {
			this.collection.fetch({add: true, error:this.onError, success:this.onSuccess});
		},
		onSuccess: function(collection, response) {
			collection.view.renderData.call(collection.view, response);
		},
		onError: function(collection, response) {
		},
		renderData: function() {
			if (this.collection.length >= 1) {
				var template = hogan.compile(StatusTemplate);
				$(this.el).append(template.render(this.collection.at(0).toJSON()));
			}
		},
		render: function() {
			return this;
		}
	});

	return StatusView;
});
