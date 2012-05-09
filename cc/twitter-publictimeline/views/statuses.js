define([
	'jquery', 
	'backbone', 
	'hogan',
	'text!templates/statuses.html', 
	'text!templates/statuses-item.html', 
	'jquery.iscroll'], 
	function($, Backbone, hogan, StatusesTemplate, StatusesItemTemplate) {
	
	"use strict";
	
	var StatusesView = Backbone.View.extend({
		initialize: function() {
			this.collection.view = this;
			this.fetch();
		},
		events: {
			'click .statuses-item': 'tweetDidSelect',
		},
		tweetDidSelect: function(e) {
			location.hash = '#statuses/show/' + $(e.currentTarget).find(".status-id").text();
			e.preventDefault(); // Prevent external link event.
		},
		refreshScroller: function() {
			setTimeout(function(scroller) {
				scroller.refresh();
			}, 1000, this.scroller);
		},
		alert: function(m) {
			template = hogan.compile(ErrorTemplate),
			$(this.el).append(template.render(m));
		},
		displayList: function(show) {
			$(this.el).find('.listview-table').css('display', show ? 'block' : 'none');
		},
		fetch: function() {
			this.displayList(false);
			// JSONP can't handle exception on ajax. So we have to use timeout.
			this.collection.fetch({error:this.onError, success:this.onSuccess, timeout:3000});
		},
		onSuccess: function(collection, response) {
			collection.view.renderList.call(collection.view);
			collection.view.displayList.call(collection.view, true);
		},
		onError: function() {
			alert("We got a problem. Serve is can't accepting for our response. Twitter has a maximum request policy");
		},
		renderList: function() {
			var template = hogan.compile(StatusesItemTemplate),
				table = $(this.el).find('.listview-table');
			
			for (var i = 0, len = this.collection.length; i < len; ++i) {
				var tweet = template.render(this.collection.at(i).attributes);
				$(table).append(tweet);
			}
			this.refreshScroller();			
		},
		render: function() {
			$(this.el).css('width', this.options.width).css('height', this.options.height);
			$(this.el).append(StatusesTemplate);
			var listview = $(this.el).find('.listview').get(0);
			this.scroller = new iScroll(listview);
			return this;
		}
	});

	return StatusesView;
});
